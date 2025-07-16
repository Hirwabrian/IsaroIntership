// src/utils/tutorialSteps.js
/**
 * An array of tutorial steps for guiding users through the application.
 * Each step includes information about the target element, content to display,
 * placement of the tooltip, and optional conditions or styles.
 *
 * @type {Array<Object>}
 * @property {string} target - A CSS selector or attribute identifying the target element for the step.
 * @property {string|Function} content - The content to display in the tooltip. Can be a string or a function returning a string.
 * @property {string} [placement="auto"] - The preferred placement of the tooltip relative to the target (e.g., "top", "right").
 * @property {boolean} [disableBeacon=false] - Whether to disable the beacon indicator for the step.
 * @property {Object} [styles] - Custom styles for the tooltip.
 * @property {Object} [styles.options] - Additional style options such as `zIndex` or `arrowColor`.
 * @property {Object} [floaterProps] - Additional properties for the tooltip floater.
 * @property {boolean} [floaterProps.disableAnimation=false] - Whether to disable animation for the tooltip.
 * @property {Function} [condition] - A function that determines whether the step should be displayed, based on the current application state.
 * @property {number} [wait=0] - A delay in milliseconds before showing the step.
 * @property {boolean} [hideBackButton=false] - Whether to hide the "Back" button in the tooltip.
 * @property {boolean} [spotlightClicks=false] - Whether to enable spotlight clicks on the target element.
 */
export const steps = [
  // ===== CORE STEPS ===== //
  {
    target: ".trees-widget",
    content: "This is your control center! Click anywhere to expand it.",
    disableBeacon: true,
    placement: "right",
    styles: {
      options: {
        zIndex: 10000,
        arrowColor: "#4CAF50",
      },
    },
  },
  {
    target: ".map-help-button",
    content: "Click here anytime to restart this tutorial.",
    placement: "left",
    floaterProps: { disableAnimation: true },
  },

  // ===== ACCOUNT MANAGEMENT STEPS ===== //
  {
    target: ".trees-content",
    content: "Here are your account management options:",
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
    wait: 300,
    styles: { options: { width: 280 } },
  },
  {
    target: ".tree-details .stat:first-child",
    content: ({ userEmail }) =>
      `You're logged in as ${userEmail || "your account"}`,
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
    hideBackButton: true,
  },
  {
    target: "[data-tour='account-settings']",
    content:
      "Update your profile, password, and notification preferences here.",
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
    spotlightClicks: true,
  },
  {
    target: "[data-tour='subscriptions']",
    content: "Manage your payment methods and subscription plans here.",
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
  },
  {
    target: "[data-tour='plant-tree']",
    content:
      "Click here to plant a new tree! This is the main action you'll use.",
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
    spotlightClicks: true,
    styles: { options: { zIndex: 10001, primaryColor: "#2E7D32" } },
  },
  {
    target: "[data-tour='logout']",
    content:
      "Securely sign out when finished. You'll need to log in again later.",
    placement: "right",
    condition: ({ selectedTree, isExpanded, isLoggedIn }) =>
      !selectedTree && isExpanded && isLoggedIn,
    styles: { options: { primaryColor: "#C62828" } },
  },

  // ===== TREE SELECTION & NAVIGATION ===== //
  {
    target: ".tree-marker",
    content: "Click any tree marker to view details about it.",
    placement: "auto",
    condition: ({ isLoggedIn }) => isLoggedIn,
    disableBeacon: true,
  },
  {
    target: ".marker-navigation",
    content:
      "Navigate between trees in your current view using these controls.",
    placement: "top",
    condition: ({ selectedTree }) => !!selectedTree,
  },
  {
    target: ".marker-counter",
    content: "This shows your position among visible trees.",
    placement: "top",
    condition: ({ selectedTree }) => !!selectedTree,
  },

  // ===== TREE DETAILS PANEL ===== //
  {
    target: ".panel-container",
    content: "This panel shows detailed information about your selected tree.",
    placement: "right",
    condition: ({ selectedTree }) => !!selectedTree,
    styles: { options: { zIndex: 10002 } },
  },
  {
    target: ".env-stats-text-overlay",
    content: "Environmental impact and health metrics for your tree.",
    placement: "right",
    condition: ({ selectedTree }) => !!selectedTree,
  },
  {
    target: ".plant-more-button",
    content: "Click here to plant more trees like this one!",
    placement: "right",
    condition: ({ selectedTree }) => !!selectedTree,
    spotlightClicks: true,
  },

  // ===== IMAGE GALLERY ===== //
  {
    target: ".infinite-carousel-wrapper",
    content: "Browse photos of your tree through different seasons.",
    placement: "right",
    condition: ({ selectedTree }) =>
      !!selectedTree && selectedTree.images?.length > 0,
  },
  {
    target: "[data-tour='scroll-up']",
    content: "Scroll up to see older photos of your tree.",
    placement: "right",
    condition: ({ selectedTree }) =>
      !!selectedTree && selectedTree.images?.length > 3,
    spotlightClicks: true,
  },
  {
    target: "[data-tour='scroll-down']",
    content: "Scroll down to see newer photos of your tree.",
    placement: "right",
    condition: ({ selectedTree }) =>
      !!selectedTree && selectedTree.images?.length > 3,
    spotlightClicks: true,
  },
  {
    target: ".thumbnail-wrapper",
    content: "Click any thumbnail to view the full-size image.",
    placement: "right",
    condition: ({ selectedTree }) =>
      !!selectedTree && selectedTree.images?.length > 0,
    spotlightClicks: true,
  },

  // ===== MAP CONTROLS ===== //
  {
    target: ".control-primary-button",
    content: ({ isPanelOpen }) =>
      isPanelOpen
        ? "Close the panel and reset view together"
        : "Reset your map view to the default position",
    placement: "left",
    floaterProps: { disableAnimation: true },
  },
  {
    target: ".dropdown-toggle",
    content: "Additional map control options are available here.",
    placement: "left",
    condition: ({ isPanelOpen }) => isPanelOpen,
    spotlightClicks: true,
  },
  {
    target: ".dropdown-menu",
    content: "Quick access to view reset and panel close actions.",
    placement: "left",
    condition: ({ isOpen }) => isOpen,
    wait: 200,
  },

  // ===== TREE ACTIONS ===== //
  {
    target: ".tree-action-btn",
    content: "Gift this tree to someone! They'll receive a certificate.",
    placement: "bottom",
    condition: ({ selectedTree }) => !!selectedTree,
    spotlightClicks: true,
  },
  {
    target: "[data-tour='download-certificate']",
    content: "Download an official certificate for this tree.",
    placement: "right",
    condition: ({ selectedTree }) => !!selectedTree,
    spotlightClicks: true,
  },
  {
    target: "[data-tour='share-tree']",
    content: "Share your tree with friends and family.",
    placement: "right",
    condition: ({ selectedTree }) => !!selectedTree,
    spotlightClicks: true,
  },
];

export const getStepContent = (stepIndex, context) => {
  const step = steps[stepIndex];
  if (!step) return null;

  const targetElement = document.querySelector(step.target);
  if (!targetElement && process.env.NODE_ENV !== "production") {
    console.warn(`Target not found for step ${stepIndex}:`, step.target);
  }

  return {
    ...step,
    content:
      typeof step.content === "function" ? step.content(context) : step.content,
  };
};
