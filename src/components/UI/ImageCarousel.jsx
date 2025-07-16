import React, { useState } from "react";
import "../../styles/UI/ImageCarousel.css";

const VISIBLE_COUNT = 3;
const ITEM_HEIGHT = 66; // 60px image + 6px gap

const InfiniteVerticalCarousel = ({
  images = [],
  thumbnailWidth = 60,
  thumbnailHeight = 60,
  onImageClick,
  selectedImage,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const total = images.length;

  const handleScroll = (direction) => {
    setStartIndex((prev) =>
      direction === "up" ? (prev - 1 + total) % total : (prev + 1) % total
    );
  };

  /**
   * Retrieves a subset of images that are currently visible in the carousel.
   *
   * @function
   * @returns {Array} An array of visible images, determined by the current start index and total number of images.
   */
  const getVisibleImages = () => {
    return Array.from({ length: VISIBLE_COUNT }).map((_, i) => {
      const index = (startIndex + i) % total;
      return images[index];
    });
  };

  return (
    <div className="infinite-carousel-wrapper botanical">
      <button
        className="scroll-icon"
        data-tour="scroll-up"
        onClick={() => handleScroll("up")}
      >
        🖱️
      </button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{
            transform: `translateY(0)`, // kept simple for now
          }}
        >
          {getVisibleImages().map((img, i) => (
            <div
              key={i}
              className={`thumbnail-wrapper ${
                selectedImage === img ? "selected" : ""
              }`}
              onClick={() => onImageClick && onImageClick(img)}
              style={{
                width: `${thumbnailWidth}px`,
                height: `${thumbnailHeight}px`,
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${i}`}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="scroll-icon"
        data-tour="scroll-down"
        onClick={() => handleScroll("down")}
      >
        🖱️
      </button>
    </div>
  );
};

export default InfiniteVerticalCarousel;
