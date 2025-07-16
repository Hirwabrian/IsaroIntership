// components/MapControls/MapControlDropdown.jsx
import React, { useState } from "react";
import { Camera, ArrowLeft, RefreshCw, X, ChevronDown } from "lucide-react";
import "../../styles/MapComponent.css";
/**
 * A dropdown component for controlling map-related actions such as resetting the view
 * and closing a panel. The component conditionally renders buttons and a dropdown menu
 * based on the `isPanelOpen` and `isOpen` states.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {boolean} props.isPanelOpen - Indicates whether the panel is currently open.
 * @param {Function} props.onReset - Callback function to reset the map view.
 * @param {Function} props.onClose - Callback function to close the panel.
 *
 * @returns {JSX.Element} The rendered MapControlDropdown component.
 */
export default function MapControlDropdown({ isPanelOpen, onReset, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePrimaryAction = () => {
    if (isPanelOpen) {
      onClose();
      onReset();
    } else {
      onReset();
    }
    setIsOpen(false);
  };

  return (
    <div className="map-control-dropdown">
      <div className="split-button-container">
        <button
          className="control-primary-button"
          onClick={handlePrimaryAction}
        >
          {isPanelOpen ? (
            <>
              <ArrowLeft size={16} />
              <span>Close & Reset</span>
            </>
          ) : (
            <>
              <Camera size={16} />
              <span>Reset View</span>
            </>
          )}
        </button>

        {isPanelOpen && (
          <button
            className="dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDown size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <button
            className="dropdown-item"
            onClick={() => {
              onReset();
              setIsOpen(false);
            }}
          >
            <RefreshCw size={16} />
            <span>Reset View Only</span>
          </button>
          <button
            className="dropdown-item"
            onClick={() => {
              onClose();
              setIsOpen(false);
            }}
          >
            <X size={16} />
            <span>Close Panel Only</span>
          </button>
        </div>
      )}
    </div>
  );
}
