import Answer from "../components/Answer";
import Sidebar from "../components/Sidebar";

function SurveyPage() {
  return (
    <div className="bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="md:grid flex  justify-center md:grid-cols-4 min-h-screen bg-black text-white">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="col-span-1 md:col-span-2">
            <Answer />
          </div>
          <div className="hidden md:block">Hello</div>
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;
