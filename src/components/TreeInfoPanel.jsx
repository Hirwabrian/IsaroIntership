import React, { useState } from "react";
import "../styles/TreeInfoPanel.css";
import ImageCarousel from "./UI/ImageCarousel";
import TreeHealthPanel from "./UI/TreeEnvironmentStats";

export default function TreeInfoPanel({ tree }) {
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Handles the click event on an image and sets the selected image URL.
   *
   * @param {string} imageUrl - The URL of the image that was clicked.
   */
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!tree) return null;

  return (
    <>
      {/* Full-Image Overlay */}
      {selectedImage && (
        <div className="full-image-overlay" onClick={closeModal}>
          <div className="image-container">
            <img
              src={selectedImage}
              alt="Selected Tree"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <div className="panel-container">
        <TreeHealthPanel />

        <ImageCarousel
          images={tree.images}
          imageScale={0.4}
          onImageClick={handleImageClick}
        />

        <button className="plant-more-button">Plant More</button>
      </div>
    </>
  );
}
