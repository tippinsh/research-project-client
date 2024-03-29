import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SurveyPage from "./pages/Survey";
import ParticipantInformationPage from "./pages/ParticipantInformation";
import ParticipantInputPage from "./pages/ParticipantInput";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/survey", element: <SurveyPage /> },
  { path: "/participant-information", element: <ParticipantInformationPage /> },
  { path: "/participant", element: <ParticipantInputPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
