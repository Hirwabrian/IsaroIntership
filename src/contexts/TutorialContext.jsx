// src/contexts/TutorialContext.js
import { createContext, useState } from "react";

export const TutorialContext = createContext();

/**
 * Provides context for managing the state of a tutorial.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will have access to the tutorial context.
 * @returns {JSX.Element} A context provider component that supplies tutorial state and updater functions.
 *
 * @context
 * @property {boolean} isTutorialActive - Indicates whether the tutorial is currently active.
 * @property {Function} setIsTutorialActive - Function to update the `isTutorialActive` state.
 * @property {number} currentStep - The current step of the tutorial.
 * @property {Function} setCurrentStep - Function to update the `currentStep` state.
 */
export const TutorialProvider = ({ children }) => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <TutorialContext.Provider
      value={{
        isTutorialActive,
        setIsTutorialActive,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
