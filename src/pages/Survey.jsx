import Answer from "../components/Answer";

function SurveyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="shadow-2xl md:p-8 border-x border-grayedout border-opacity-50">
        <Answer />
      </div>
    </div>
  );
}

export default SurveyPage;
