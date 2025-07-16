import { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { steps } from "../utils/tutorialSteps";

/**
 * TourManager component manages and displays a guided tour using the Joyride library.
 * It dynamically validates and prepares tour steps based on the application's state
 * and user interactions.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isActive - Determines if the tour is active and should run.
 * @param {Function} props.onComplete - Callback function triggered when the tour is completed, skipped, or closed.
 * @param {Object} props.selectedTree - The currently selected tree object, used for conditional step rendering.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in, used for conditional step rendering.
 * @param {string} props.userEmail - The email of the logged-in user, used for conditional step rendering.
 *
 * @returns {JSX.Element|null} The Joyride component if the tour is active, otherwise null.
 */
export default function TourManager({
  isActive,
  onComplete,
  selectedTree,
  isLoggedIn,
  userEmail,
}) {
  const [state, setState] = useState({
    running: false,
    steps: [],
  });

  useEffect(() => {
    const waitForElement = (selector, timeout = 2000) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(selector)) return resolve(true);

        const observer = new MutationObserver(() => {
          if (document.querySelector(selector)) {
            observer.disconnect();
            resolve(true);
          }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Element ${selector} not found`));
        }, timeout);
      });
    };

    const prepareTour = async () => {
      if (!isActive) return;

      const validatedSteps = [];
      for (const step of steps) {
        try {
          const shouldShow =
            !step.condition ||
            step.condition({
              selectedTree,
              isExpanded: document
                .querySelector(".trees-widget")
                ?.classList.contains("expanded"),
              isLoggedIn,
              userEmail,
            });

          if (shouldShow) {
            await waitForElement(step.target);
            validatedSteps.push(step);
          }
        } catch (e) {
          console.warn(`Skipping step (${step.target}):`, e.message);
        }
      }

      setState({
        running: validatedSteps.length > 0,
        steps: validatedSteps,
      });
    };

    prepareTour();
  }, [isActive, selectedTree, isLoggedIn, userEmail]);

  if (!isActive) return null;

  return (
    <Joyride
      steps={state.steps}
      run={state.running}
      continuous
      callback={({ action, status }) => {
        if (
          ["close", "skip", "finish"].includes(action) ||
          status === "finished"
        ) {
          onComplete();
        }
      }}
      styles={{
        options: {
          arrowColor: "#4CAF50",
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: "#4CAF50",
        },
      }}
      spotlightClicks
      showProgress
      showSkipButton
    />
  );
}
