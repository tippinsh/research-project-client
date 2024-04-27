import Answer from "../components/Answer";
import Sidebar from "../components/Sidebar";
import RecommendationBar from "../components/RecommendationBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SurveyPage() {
  const navigateTo = useNavigate();

  useEffect(() => {
    const participantId = sessionStorage.getItem("participantId");
    if (!participantId) {
      navigateTo("/participant");
    }
  }, [navigateTo]);

  window.onbeforeunload = (event) => {
    event.preventDefault();
    return "";
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="md:grid flex justify-center md:grid-cols-4 bg-black text-white">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="md:col-span-2 pb-10 md:pb-0">
            <Answer />
          </div>
          <div className="hidden md:block">
            <RecommendationBar />
          </div>
        </div>
      </div>
    </div>
  );
}
