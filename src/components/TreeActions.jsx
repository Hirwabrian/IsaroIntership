import React from "react";
import { FaGift, FaDownload, FaShareAlt } from "react-icons/fa";
import "../styles/TreeActions.css";

/**
 * TreeActions Component
 *
 * This component renders a cluster of action buttons for interacting with a tree.
 * It provides buttons for gifting, downloading a certificate, and sharing the tree.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.onGift - Callback function triggered when the "Gift" button is clicked.
 * @param {Function} props.onDownload - Callback function triggered when the "Download" button is clicked.
 * @param {Function} props.onShare - Callback function triggered when the "Share" button is clicked.
 *
 * @returns {JSX.Element} A cluster of action buttons for tree-related actions.
 */
const TreeActions = ({ onGift, onDownload, onShare }) => {
  return (
    <div className="tree-actions-cluster">
      {/* Gift Button (Primary) */}
      <button
        className="tree-action-btn tree-action-primary"
        onClick={onGift}
        aria-label="Gift this tree"
      >
        <FaGift className="tree-action-icon" />
      </button>

      {/* Download Button */}
      <button
        className="tree-action-btn"
        onClick={onDownload}
        aria-label="Download certificate"
      >
        <FaDownload className="tree-action-icon" />
      </button>

      {/* Share Button */}
      <button
        className="tree-action-btn"
        onClick={onShare}
        aria-label="Share tree"
      >
        <FaShareAlt className="tree-action-icon" />
      </button>
    </div>
  );
};

export default TreeActions;
