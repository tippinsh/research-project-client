import Answer from "../components/Answer";
import Sidebar from "../components/Sidebar";
import RecommendationBar from "../components/RecommendationBar";

function SurveyPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="md:grid flex justify-center md:grid-cols-4 bg-black text-white">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="md:col-span-2">
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

export default SurveyPage;
