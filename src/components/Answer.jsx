import { useEffect, useState } from "react";
import Tweet from "./Tweet";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [realOrFake, setRealorFake] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedConfidence, setSelectedConfidence] = useState(0);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (storedQuestions) {
      setQuestions(storedQuestions);
    } else {
      async function fetchImages() {
        try {
          const response = await fetch("http://localhost:8080/api/images");

          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }

          const data = await response.json();

          localStorage.setItem("questions", JSON.stringify(data));
          console.log(questions);

          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }

      fetchImages();
    }
  }, []);

  useEffect(() => {
    const isDisabled = !(
      (realOrFake === "Real" || realOrFake === "Fake") &&
      selectedConfidence !== 0
    );

    setDisableButton(isDisabled);
  }, [realOrFake, selectedConfidence]);

  const handleRealAnswer = () => {
    setRealorFake("Real");
  };

  const handleFakeAnswer = () => {
    setRealorFake("Fake");
  };

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    if (!(realOrFake && selectedConfidence)) {
      return;
    }

    const answer = {
      imageId: questions[questionIndex].id,
      guess: realOrFake === "Real" ? 0 : 1,
      isWithContext: questions[questionIndex].isWithContext,
      confidenceLevel: selectedConfidence,
      submitted: new Date(),
      participantId: 1,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setRealorFake(null);
    setSelectedConfidence("");
    document.getElementById("options").value = "";
  };

  return (
    <div>
      {questions && questions.length > 1 && (
        <Tweet
          url={questions[questionIndex].url}
          context={questions[questionIndex].context}
        />
      )}
      <div className="text-center mt-6 text-md md:text-lg">
        I believe this image is...
      </div>
      <div className="flex justify-center gap-4 mt-3">
        <button
          className={`py-2 md:py-3 md:px-16 px-8 text-md font-normal text-${
            realOrFake === "Real" ? "black" : "white"
          } bg-${
            realOrFake === "Real" ? "white" : "black"
          } border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black`}
          onClick={handleRealAnswer}
        >
          Real
        </button>
        <button
          className={`py-2 md:py-3 md:px-16 px-8 font-normal text-${
            realOrFake === "Fake" ? "black" : "white"
          } bg-${
            realOrFake === "Fake" ? "white" : "black"
          } border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black`}
          onClick={handleFakeAnswer}
        >
          Fake
        </button>
      </div>
      <div className="flex justify-center flex-col pt-4 items-center">
        <label htmlFor="options" className="pr-4">
          Please state your confidence in your answer..
        </label>
        <select
          name=""
          id="options"
          className="mt-2 py-2 w-48 bg-white rounded-md"
          onChange={(e) => setSelectedConfidence(e.target.value)}
        >
          <option value="" className="">
            Select...
          </option>
          <option value="1">Not at all confident</option>
          <option value="2">Somewhat confident</option>
          <option value="3">Moderately confident</option>
          <option value="4">Mostly confident</option>
          <option value="5">100% confident</option>
        </select>
      </div>
      <div className="flex justify-center pt-4">
        <button
          onClick={handleNextQuestion}
          disabled={disableButton}
          className={`py-2 md:py-3 md:px-16 px-8 text-md font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 ${
            disableButton
              ? "cursor-not-allowed"
              : "hover:bg-white hover:text-black"
          }`}
        >
          Save & Next &#8594;
        </button>
      </div>
    </div>
  );
}
