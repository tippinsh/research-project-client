import Answer from "../components/Answer";

function SurveyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="p-6 m-3 space-y-10 shadow-2xl rounded-3xl md:p-10">
        <Answer />
      </div>
    </div>
  );
}

export default SurveyPage;
