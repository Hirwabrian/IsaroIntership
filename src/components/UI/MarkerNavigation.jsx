import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MarkerNavigation({
  markers,
  currentIndex,
  onChange,
  visible,
}) {
  const [showArrows, setShowArrows] = useState({ left: false, right: false });
  const hoverTimeout = useRef(null);
  const clickTimeout = useRef(null);

  // Reset visibility after navigation
  useEffect(() => {
    if (visible) {
      /**
       * Sets a timeout to hide navigation arrows after a specified delay.
       *
       * @constant
       * @type {NodeJS.Timeout}
       * @description This timer triggers a function to update the state of `showArrows`,
       *              setting both `left` and `right` properties to `false` after 3000 milliseconds (3 seconds).
       */
      const timer = setTimeout(() => {
        setShowArrows({ left: false, right: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, visible]);

  const handleNavigation = (direction) => {
    clearTimeout(hoverTimeout.current);
    clearTimeout(clickTimeout.current);

    const newIndex =
      (currentIndex + direction + markers.length) % markers.length;
    onChange(newIndex);

    // Temporarily hide arrows during flight
    setShowArrows({ left: false, right: false });

    // Re-enable arrows after animation
    clickTimeout.current = setTimeout(() => {
      setShowArrows({ left: true, right: true });
    }, 2500); // Match flyTo duration
  };

  // Mouse movement handler
  useEffect(() => {
    if (!visible) return;

    const handleMouseMove = (e) => {
      const { clientX, innerWidth } = e;
      const edgeThreshold = innerWidth * 0.1;

      clearTimeout(hoverTimeout.current);

      hoverTimeout.current = setTimeout(() => {
        setShowArrows({
          left: clientX < edgeThreshold,
          right: clientX > innerWidth - edgeThreshold,
        });
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hoverTimeout.current);
      clearTimeout(clickTimeout.current);
    };
  }, [visible]);

  if (!visible || markers.length <= 1) return null;

  return (
    <>
      {showArrows.left && (
        <button
          className="nav-arrow left"
          onClick={() => handleNavigation(-1)}
          aria-label="Previous tree"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {showArrows.right && (
        <button
          className="nav-arrow right"
          onClick={() => handleNavigation(1)}
          aria-label="Next tree"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </>
  );
}
