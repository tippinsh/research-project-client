import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SurveyPage from "./pages/Survey";
import ParticipantInformationPage from "./pages/ParticipantInformation";
import ParticipantInputPage from "./pages/ParticipantInput";
import InstructionsPage from "./pages/Instructions";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/survey", element: <SurveyPage /> },
  { path: "/participant-information", element: <ParticipantInformationPage /> },
  { path: "/participant", element: <ParticipantInputPage /> },
  { path: "/instructions", element: <InstructionsPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
