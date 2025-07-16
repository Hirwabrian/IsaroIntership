import React from "react";
import "../../styles/UI/TreeEnvironmentStats.css";

/**
 * TreeEnvironmentStats Component
 *
 * This component displays environmental statistics related to a tree's environment.
 * It includes primary and secondary metrics such as CO₂ removed, humidity, soil condition, and temperature.
 *
 * @component
 * @returns {JSX.Element} A styled overlay containing environmental statistics.
 *
 * @example
 * <TreeEnvironmentStats />
 *
 * CSS Classes:
 * - `env-stats-text-overlay`: Wrapper for the entire stats overlay.
 * - `env-primary`: Container for the primary metric (CO₂ removed).
 * - `env-secondary`: Container for secondary metrics (humidity, soil, temperature).
 * - `label`: Styling for the labels of the metrics.
 * - `value`: Styling for the values of the metrics.
 */
const TreeEnvironmentStats = () => {
  return (
    <div className="env-stats-text-overlay">
      {/* Primary metric - now with slight weight */}
      <div className="env-primary">
        <span className="label">CO₂ removed: </span>
        <span className="value">12 kg</span>
      </div>

      {/* Secondary group - pure text with hover states */}
      <div className="env-secondary">
        <div>
          <span className="label">Humidity: </span>
          <span className="value">45%</span>
        </div>
        <div>
          <span className="label">Soil: </span>
          <span className="value">Good</span>
        </div>
        <div>
          <span className="label">Temp: </span>
          <span className="value">22°C</span>
        </div>
      </div>
    </div>
  );
};

export default TreeEnvironmentStats;
