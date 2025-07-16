import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ChevronDown,
  ChevronUp,
  Leaf,
  User,
  Settings,
  CreditCard,
  PlusCircle,
  LogOut,
  Calendar,
  CloudRain,
  Gift,
  Download,
  Share2,
} from "lucide-react";
import "../../styles/UI/TreesWidget.css";

/**
 * TreesWidget Component
 *
 * A widget for displaying and interacting with a list of trees or account settings.
 *
 * @param {Object} props - Component properties.
 * @param {Array} [props.trees=[]] - Array of tree objects to display.
 * @param {Object|null} [props.selectedTree=null] - The currently selected tree object.
 * @param {Function} [props.onSelectTree=() => {}] - Callback function triggered when a tree is selected.
 * @param {Function} [props.onShowAllTrees=() => {}] - Callback function triggered to show all trees.
 * @param {Function} [props.onGift=() => {}] - Callback function triggered to gift the selected tree.
 * @param {Function} [props.onDownload=() => {}] - Callback function triggered to download the tree certificate.
 * @param {Function} [props.onShare=() => {}] - Callback function triggered to share the selected tree.
 *
 * @returns {JSX.Element} The rendered TreesWidget component.
 */
const TreesWidget = ({
  trees = [],
  selectedTree = null,
  onSelectTree = () => {},
  onShowAllTrees = () => {},
  onGift = () => {},
  onDownload = () => {},
  onShare = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalTrees = trees.length;
  const currentIndex = selectedTree
    ? trees.findIndex((t) => t.id === selectedTree.id) + 1
    : 0;

  // Account management handlers
  const handleAccountSettings = () => {
    console.log("Account settings clicked");
    setIsExpanded(false);
  };

  const handleSubscriptions = () => {
    console.log("Subscriptions clicked");
    setIsExpanded(false);
  };

  const handlePlantNew = () => {
    console.log("Plant new tree clicked");
    setIsExpanded(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("treeAppUser");
    window.location.reload();
  };

  return (
    <div className="trees-container">
      {/* Main Widget */}
      <div
        className={`trees-widget ${selectedTree ? "selected" : ""} ${
          isExpanded ? "expanded" : ""
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Header Row */}
        <div className="trees-header">
          <div className="trees-title">
            {selectedTree ? (
              <>
                <Leaf size={14} className="icon" />
                <span className="tree-name">{selectedTree.name}</span>
              </>
            ) : (
              <>
                <User size={14} className="icon" />
                <span>My Account</span>
              </>
            )}
          </div>

          <div className="trees-meta">
            {selectedTree && (
              <span>
                {currentIndex} of {totalTrees}
              </span>
            )}
            <button
              className="trees-chevron"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="trees-content">
            {selectedTree ? (
              <div className="tree-details">
                <button
                  className="tree-list-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowAllTrees();
                  }}
                >
                  <span>View All Trees</span>
                  <span className="count">{totalTrees}</span>
                </button>

                <div className="tree-stats">
                  <div className="stat">
                    <Calendar size={14} className="icon" />
                    <span>Planted: {selectedTree.plantedYear || "N/A"}</span>
                  </div>
                  <div className="stat">
                    <CloudRain size={14} className="icon" />
                    <span>CO₂: {selectedTree.co2Offset || "0"}kg</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tree-details">
                <div
                  className="stat"
                  style={{
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    marginBottom: "8px",
                  }}
                >
                  <User size={14} className="icon" />
                  <span>
                    Logged in as <strong>user@example.com</strong>
                  </span>
                </div>

                <button
                  className="tree-list-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAccountSettings();
                  }}
                >
                  <Settings size={14} className="icon" />
                  <span>Account Settings</span>
                </button>

                <button
                  className="tree-list-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscriptions();
                  }}
                >
                  <CreditCard size={14} className="icon" />
                  <span>Subscriptions</span>
                </button>

                <button
                  className="tree-list-item"
                  style={{ color: "#4CAF50" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlantNew();
                  }}
                >
                  <PlusCircle size={14} className="icon" />
                  <span>Plant New Tree</span>
                </button>

                <button
                  className="tree-list-item"
                  style={{ color: "#ff5252" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  <LogOut size={14} className="icon" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {selectedTree && (
        <div className="tree-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGift();
            }}
            aria-label="Gift this tree"
          >
            <Gift size={14} />
            <span>Gift</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            aria-label="Download certificate"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            aria-label="Share tree"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      )}
    </div>
  );
};

TreesWidget.propTypes = {
  trees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      species: PropTypes.string,
      plantedYear: PropTypes.number,
      co2Offset: PropTypes.number,
    })
  ),
  selectedTree: PropTypes.oneOfType([PropTypes.object, PropTypes.null]),
  onSelectTree: PropTypes.func,
  onShowAllTrees: PropTypes.func,
  onGift: PropTypes.func,
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
};

export default TreesWidget;
