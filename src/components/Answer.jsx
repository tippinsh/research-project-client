import { useEffect, useState } from "react";
import Tweet from "./Tweet";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [realOrFake, setRealorFake] = useState(null);

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

  const handleRealAnswer = () => {
    setRealorFake("Real");
  };

  const handleFakeAnswer = () => {
    setRealorFake("Fake");
  };

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    setRealorFake(null);

    const answerArray = [];

    for (let i = 0; i < 20; i++) {
      const answer = {
        imageId: questions[i].imageId,
        guess: realOrFake === "Real" ? 0 : 1,
        isWithContext: questions[i].isWithContext,
        confidenceLevel: questions[i].confidenceLevel,
        submitted: new Date(),
        participantId: 1,
      };

      answerArray.push(answer);
    }
  };

  return (
    <div>
      {questions && questions.length > 1 && (
        <Tweet
          url={questions[questionIndex].url}
          context={questions[questionIndex].context}
        />
      )}
      <div className="text-center mt-6">I believe this image is...</div>
      <div className="flex justify-center gap-4 mt-3">
        <button
          className={`py-3 px-16 text-md font-normal text-${
            realOrFake === "Real" ? "black" : "white"
          } bg-${
            realOrFake === "Real" ? "white" : "black"
          } border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black`}
          onClick={handleRealAnswer}
        >
          Real
        </button>
        <button
          className={`py-3 px-16 text-md font-normal text-${
            realOrFake === "Fake" ? "black" : "white"
          } bg-${
            realOrFake === "Fake" ? "white" : "black"
          } border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black`}
          onClick={handleFakeAnswer}
        >
          Fake
        </button>
      </div>
      <button
        onClick={handleNextQuestion}
        className="py-3 px-16 text-md font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black"
      >
        Next
      </button>
    </div>
  );
}
