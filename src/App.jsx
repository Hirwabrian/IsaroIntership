/**
 * The main application component that wraps the entire app.
 * It provides the `TutorialProvider` context to manage tutorial-related state
 * and renders the `MapComponent` as the primary feature.
 *
 * @component
 * @returns {JSX.Element} The root component of the application.
 */
import { TutorialProvider } from "./contexts/TutorialContext"; // Adjust the path if needed
import MapComponent from "./components/MapComponent";

export default function App() {
  return (
    <div className="app-container">
      <TutorialProvider>
        <MapComponent />
      </TutorialProvider>
    </div>
  );
}
