import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { treeData } from "../utils/mapConfig";
import "../styles/MapComponent.css";
import TreeInfoPanel from "./TreeInfoPanel";
import MapControlDropdown from "./UI/MapControlDropdown";
import MarkerNavigation from "./UI/MarkerNavigation";
import TreesWidget from "./UI/TreesWidget";
import AuthModal from "./AuthModal";
import * as turf from "@turf/turf";
import { generate } from "@pdfme/generator";
import template from "../../public/pdf/template.json";
import TourManager from "../components/TourManager";
import { HelpCircle } from "lucide-react";
import { TutorialContext } from "../contexts/TutorialContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGlyd2FicmlhbjExMyIsImEiOiJjbTc0bHJmeHkwYzhoMmpzY3BobDlpOTkyIn0.fy0D3d2g3YsB8oSDaBanhQ";

/**
 * MapComponent is a React functional component that renders an interactive map using Mapbox GL.
 * It provides features such as user authentication, tree marker visualization, heatmap generation,
 * and various user interactions like sharing, downloading, and gifting tree information.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered map component.
 *
 * @description
 * - Initializes a Mapbox map with terrain and sky layers.
 * - Handles user authentication and dynamically updates the map with user-specific tree data.
 * - Provides functionalities to interact with tree markers, including flying to markers,
 *   displaying tree details, and navigating between markers.
 * - Includes a heatmap layer to visualize tree density.
 * - Offers sharing options for social media and clipboard, as well as downloading tree certificates.
 * - Integrates a guided tutorial and additional UI components for enhanced user experience.
 *
 * @example
 * <MapComponent />
 *
 * @dependencies
 * - React
 * - Mapbox GL
 * - Turf.js
 * - Context API (TutorialContext)
 * - Custom components: AuthModal, TourManager, MapControlDropdown, TreesWidget, MarkerNavigation, TreeInfoPanel
 *
 * @hooks
 * - useRef: To manage references to the map container and markers.
 * - useState: To manage component state such as selected tree, user login status, and filtered trees.
 * - useContext: To access the tutorial context.
 * - useEffect: To initialize the map and handle side effects like user login.
 */
export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { isTutorialActive, setIsTutorialActive } = useContext(TutorialContext);
  const [selectedTree, setSelectedTree] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState([0, 0]);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [markersInView, setMarkersInView] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [filteredTrees, setFilteredTrees] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const markerRefs = useRef({});
  const handleGiftTree = () => {
    if (!selectedTree) return;
    const giftUrl = `http://localhost:5173/gift?treeName=${selectedTree.name}`;
    window.open(giftUrl, "_blank");
  };

  const handleDownload = async () => {
    if (!selectedTree) return;
    try {
      const pdf = await generate({
        template,
        inputs: [
          { treeName: selectedTree.name, ownerName: selectedTree.owner },
        ],
      });
      const blob = new Blob([pdf.buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to generate certificate:", err);
    }
  };

  const handleSocialShare = () => {
    if (!selectedTree) return;

    const shareUrl = `https://ecoforest.app/tree/${selectedTree.id}`;
    const shareText = `Check out my ${selectedTree.name} tree planted with EcoForest! 🌳`;

    // Remove existing panel if any
    document.querySelector(".share-panel-container")?.remove();

    const sharePanel = document.createElement("div");
    sharePanel.className = "share-panel-container";
    sharePanel.innerHTML = `
      <div class="share-panel">
        <div class="share-header">
          <h4>Share This Tree</h4>
          <button class="close-share" aria-label="Close share panel">
            &times;
          </button>
        </div>
        <div class="share-options">
          <button class="share-option twitter" data-platform="twitter">
            <div class="share-icon">
              <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </div>
            <span>Twitter</span>
          </button>
          <button class="share-option facebook" data-platform="facebook">
            <div class="share-icon">
              <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </div>
            <span>Facebook</span>
          </button>
          <button class="share-option link" data-platform="copy">
            <div class="share-icon">
              <svg viewBox="0 0 24 24"><path d="M10 6V5h7v14h-7v-1h6V6h-6zm-2 2c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1h-2v1H8v-6h6V9H8V8h6V7H8v1z"/></svg>
            </div>
            <span>Copy Link</span>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(sharePanel);

    // Position near the widget

    // Add interactions
    sharePanel.querySelectorAll(".share-option").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const platform = e.currentTarget.dataset.platform;

        // Visual feedback
        btn.classList.add("clicked");
        setTimeout(() => btn.classList.remove("clicked"), 300);

        // Handle share action
        if (platform === "copy") {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          btn.querySelector("span").textContent = "Copied!";
          setTimeout(() => {
            btn.querySelector("span").textContent = "Copy Link";
          }, 2000);
        } else {
          window.open(
            platform === "twitter"
              ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}&url=${encodeURIComponent(shareUrl)}`
              : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`,
            "_blank"
          );
        }
      });
    });

    // Close button
    sharePanel.querySelector(".close-share").addEventListener("click", () => {
      sharePanel.classList.add("closing");
      setTimeout(() => sharePanel.remove(), 200);
    });

    // Click outside
    sharePanel.addEventListener("click", (e) => {
      if (e.target === sharePanel) {
        sharePanel.classList.add("closing");
        setTimeout(() => sharePanel.remove(), 200);
      }
    });
  }; // <-- Fixed: Removed extra semicolon and ensured proper closing

  const emailToNameMap = {
    "user1@example.com": "John Doe",
    "demo@example.com": "Demo User",
  };

  // Initialize basic map (no interactions, no markers)
  useEffect(() => {
    if (!mapContainer.current) return;

    // Filter invalid trees first
    treeData.features = treeData.features.filter(
      (f) =>
        f.geometry?.coordinates &&
        Array.isArray(f.geometry.coordinates) &&
        f.geometry.coordinates.length === 2
    );

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [0, 0], // Neutral starting point
      zoom: 1,
      pitch: 0, // Reset pitch for initial view
      bearing: 0,
      antialias: true,
    });

    const disableInteractions = () => {
      if (!map.current) return;
      map.current.dragPan.disable();
      map.current.scrollZoom.disable();
      map.current.doubleClickZoom.disable();
      map.current.touchZoomRotate.disable();
    };

    map.current.on("load", () => {
      disableInteractions();
      setIsMapReady(true);

      // Add base layers only (no markers yet)
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 15,
      });

      map.current.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5,
      });

      // Check for existing login
      const user = JSON.parse(localStorage.getItem("treeAppUser"));
      if (user && user.email) {
        // More robust check
        handleLoginSuccess(user.email);
      } else {
        // Ensure modal will show
        setIsLoggedIn(false);
        setUserEmail("");
      }
    });

    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("treeAppUser"));
    if (user?.email && isMapReady) {
      // Force re-render of markers
      handleLoginSuccess(user.email);
    }
  }, [isMapReady]); // Trigger when map is ready

  // Handle successful login
  const handleLoginSuccess = (email) => {
    const userTrees = treeData.features.filter(
      (tree) => tree.properties.ownerEmail === email
    );

    setUserEmail(email);
    setFilteredTrees(userTrees);
    setIsLoggedIn(true);
    localStorage.setItem("treeAppUser", JSON.stringify({ email }));

    // Only proceed if map is ready
    if (isMapReady) {
      enableMapInteractions();
      addFilteredMarkers(userTrees);
      flyToDenseArea(userTrees);
    }
  };

  // Add markers only after login
  const addFilteredMarkers = (trees) => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markerRefs.current).forEach((marker) => marker.remove());
    markerRefs.current = {};

    // Add heatmap layer for filtered trees
    map.current.addSource("filtered-heatmap-data", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: trees,
      },
    });

    map.current.addLayer({
      id: "filtered-heatmap-layer",
      type: "heatmap",
      source: "filtered-heatmap-data",
      paint: {
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "name"],
          0,
          0,
          6,
          1,
        ],
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(0, 0, 255, 0)",
          0.2,
          "rgb(0, 255, 255)",
          0.4,
          "rgb(0, 255, 0)",
          0.6,
          "rgb(150, 235, 101)",
          0.8,
          "rgb(181, 218, 186)",
        ],
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
      },
    });

    // Add individual markers
    trees.forEach((feature) => {
      console.log("At marker creation, filteredTrees:", filteredTrees);
      const el = document.createElement("div");
      el.className = "tree-marker";
      el.style.backgroundImage = "url(images/Tree-icon.png)";
      el.style.width = "24px";
      el.style.height = "40px";
      el.style.backgroundSize = "contain";
      el.style.backgroundPosition = "center";
      el.style.backgroundRepeat = "no-repeat";

      const marker = new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setOffset([0, -30])
        .addTo(map.current);

      markerRefs.current[feature.properties.id] = marker;

      el.addEventListener("click", () => {
        console.log("At marker click, filteredTrees:", filteredTrees);
        console.log("At marker click, trees param:", trees);
        const coords = feature.geometry?.coordinates;
        if (!coords || !Array.isArray(coords)) {
          console.error("Invalid coordinates:", feature);
          return;
        }

        const viewportMarkers = getMarkersInViewport(trees);
        const clickedIndex = viewportMarkers.findIndex(
          (m) => m.properties.id === feature.properties.id
        );

        if (clickedIndex === -1) return;

        setCurrentMarkerIndex(clickedIndex);
        setMarkersInView(viewportMarkers);
        flyToMarker(feature);
      });
    });
  };

  // Fly to dense area only after login
  const flyToDenseArea = (trees) => {
    if (!map.current || !trees.length) return;

    const center = calculateDenseFocus(trees);
    map.current.flyTo({
      center,
      zoom: 14,
      pitch: 45,
      bearing: -20,
      speed: 1.2,
      curve: 1.4,
      duration: 2500,
      essential: true,
    });
  };

  // Calculate center based on filtered trees
  const calculateDenseFocus = (trees) => {
    if (!trees.length) return [0, 0];

    const gridSize = 0.02;
    const grid = {};

    trees.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      const gridX = Math.floor(lng / gridSize) * gridSize;
      const gridY = Math.floor(lat / gridSize) * gridSize;
      const key = `${gridX},${gridY}`;

      if (!grid[key]) {
        grid[key] = { count: 0, lngSum: 0, latSum: 0 };
      }

      grid[key].count++;
      grid[key].lngSum += lng;
      grid[key].latSum += lat;
    });

    let max = 0;
    let center = [0, 0];

    Object.values(grid).forEach((cell) => {
      if (cell.count > max) {
        max = cell.count;
        center = [cell.lngSum / cell.count, cell.latSum / cell.count];
      }
    });

    return center;
  };

  // Enable map interactions
  const enableMapInteractions = () => {
    if (!map.current) return;

    // Enable all interaction handlers
    map.current.dragPan.enable();
    map.current.scrollZoom.enable();
    map.current.doubleClickZoom.enable();
    map.current.touchZoomRotate.enable();
    map.current.boxZoom.enable();
    map.current.keyboard.enable();

    // Force style refresh (sometimes needed)
    map.current.setStyle(map.current.getStyle());

    console.log("All map interactions enabled"); // Debug helper
  };

  // Get markers currently in viewport
  const getMarkersInViewport = (targetTrees) => {
    console.log("getMarkersInViewport called, filteredTrees:", filteredTrees);
    if (!map.current) return [];

    const bounds = map.current.getBounds();
    const center = map.current.getCenter();

    return targetTrees
      .filter((feature) => {
        const coords = feature.geometry?.coordinates;
        return (
          coords &&
          Array.isArray(coords) &&
          coords.length === 2 &&
          bounds.contains(coords)
        );
      })
      .sort((a, b) => {
        const coordsA = a.geometry?.coordinates;
        const coordsB = b.geometry?.coordinates;

        if (!coordsA || !coordsB) return 0;

        try {
          const from = turf.point([center.lng, center.lat]);
          const toA = turf.point(coordsA);
          const toB = turf.point(coordsB);
          return turf.distance(from, toA) - turf.distance(from, toB);
        } catch (e) {
          console.error("Turf error:", e);
          return 0;
        }
      });
  };

  const flyToMarker = (marker) => {
    const coords = marker.geometry?.coordinates;
    if (!coords || !Array.isArray(coords)) {
      console.error("Invalid marker coordinates:", marker);
      return;
    }

    map.current.flyTo({
      center: coords,
      zoom: 16.3,
      pitch: 80,
      bearing: 0,
      speed: 1,
      curve: 1.2,
      essential: true,
    });

    setSelectedTree({
      ...marker.properties,
      owner: emailToNameMap[marker.properties.ownerEmail] || "Unknown Owner", // Owner's name
      ownerEmail: marker.properties.ownerEmail, // Original email (preserved)
      latitude: coords[1],
      longitude: coords[0],
    });
    setMarkerCoordinates(coords);
  };

  const handleClosePanel = () => {
    setSelectedTree(null);
  };

  const getMarkerScreenPosition = () => {
    if (!map.current || !markerCoordinates) return { x: 0, y: 0 };
    const [lng, lat] = markerCoordinates;
    const point = map.current.project([lng, lat]);
    return { x: point.x, y: point.y };
  };

  return (
    <div ref={mapContainer} className="map-container">
      <button
        onClick={() => setIsTutorialActive(true)}
        className={`map-help-button ${isLoggedIn ? "highlight" : ""}`}
        aria-label="Start guided tour"
      >
        <HelpCircle size={20} />
      </button>
      <>
        // Add this where your Joyride was:
        <TourManager
          isActive={isTutorialActive}
          onComplete={() => setIsTutorialActive(false)}
          selectedTree={selectedTree}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
        />
        {/* Your existing components */}
      </>
      {!isLoggedIn && isMapReady && (
        <AuthModal onLoginSuccess={handleLoginSuccess} />
      )}

      <MapControlDropdown
        isPanelOpen={!!selectedTree}
        onReset={() => flyToDenseArea(filteredTrees)}
        onClose={handleClosePanel}
        map={map.current}
      />

      <TreesWidget
        trees={filteredTrees.map((f) => f.properties)}
        selectedTree={selectedTree}
        onSelectTree={(tree) => {
          const feature = filteredTrees.find(
            (f) => f.properties.id === tree.id
          );
          if (feature) flyToMarker(feature);
        }}
        onShowAllTrees={() => {
          setSelectedTree(null);
          flyToDenseArea(filteredTrees);
        }}
        onGift={handleGiftTree}
        onDownload={handleDownload}
        onShare={handleSocialShare}
      />

      {selectedTree && (
        <>
          <MarkerNavigation
            markers={markersInView}
            currentIndex={currentMarkerIndex}
            onChange={(newIndex) => {
              const marker = markersInView[newIndex];
              setCurrentMarkerIndex(newIndex);
              flyToMarker(marker);
            }}
            map={map.current}
            visible={!!selectedTree}
          />
          <div className="marker-counter">
            {currentMarkerIndex + 1}/{markersInView.length}
          </div>

          <TreeInfoPanel
            tree={selectedTree}
            onClose={handleClosePanel}
            markerPosition={getMarkerScreenPosition()}
            map={map.current}
          />
        </>
      )}
    </div>
  );
}
