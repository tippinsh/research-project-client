import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SurveyPage from "./pages/Survey";
import ParticipantInformationPage from "./pages/ParticipantInformation";
import ParticipantInputPage from "./pages/ParticipantInput";
import InstructionsPage from "./pages/Instructions";
import ConclusionPage from "./pages/Conclusion.jsx";

// eslint-disable-next-line no-unused-vars
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/survey", element: <SurveyPage /> },
  { path: "/participant-information", element: <ParticipantInformationPage /> },
  { path: "/participant", element: <ParticipantInputPage /> },
  { path: "/instructions", element: <InstructionsPage /> },
]);

const offlineRouter = createBrowserRouter([
  { path: "/", element: <ConclusionPage /> },
]);

function App() {
  return <RouterProvider router={offlineRouter} />;
  // return <RouterProvider router={router} />;
}

export default App;
