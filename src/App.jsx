import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SurveyPage from "./pages/Survey";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/survey", element: <SurveyPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
