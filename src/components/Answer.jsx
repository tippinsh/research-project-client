import { useEffect, useState } from "react";
import Tweet from "./Tweet";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [realOrFake, setRealorFake] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedConfidence, setSelectedConfidence] = useState(0);
  const [lastSeen, setLastSeen] = useState(5);
  const [twitterData, setTwitterData] = useState([]);

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

          setQuestions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }

      fetchImages();
    }
  }, []);

  useEffect(() => {
    async function fetchTwitterData() {
      try {
        const storedTwitterData = localStorage.getItem("twitterData");

        if (storedTwitterData) {
          setTwitterData(JSON.parse(storedTwitterData));
        } else {
          const response = await fetch(
            "http://localhost:8080/api/profile-data"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch twitter data");
          }

          const data = await response.json();

          setTwitterData(data);
          localStorage.setItem("twitterData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching twitter data:", error);
      }
    }

    fetchTwitterData();
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
    generateRandomNumber();
  };

  const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    setLastSeen(randomNum);
  };

  return (
    <div>
      {questions && questions.length > 1 && twitterData.length > 0 && (
        <Tweet
          url={questions[questionIndex].url}
          context={questions[questionIndex].context}
          questionIndex={questionIndex}
          lastSeen={lastSeen}
          twitterName={twitterData[questionIndex].name}
        />
      )}
      <div className="flex items-center mt-6">
        <div className="w-full border-t border-gray-300"></div>
        <div className="w-full border-t border-gray-300"></div>
      </div>
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
        <label htmlFor="options" className="pr-4 mb-3">
          Please state your confidence in your answer..
        </label>
        <select
          id="options"
          className="block appearance-none bg-white w-1/2 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
          onChange={(e) => setSelectedConfidence(e.target.value)}
        >
          <option value="" disabled selected>
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
