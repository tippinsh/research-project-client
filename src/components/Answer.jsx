import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import { Transition } from "@headlessui/react";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [realOrFake, setRealorFake] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedConfidence, setSelectedConfidence] = useState(0);
  const [lastSeen, setLastSeen] = useState(5);
  const [twitterData, setTwitterData] = useState([]);
  const [showContent, setShowContent] = useState(false);

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
    const isDisabled =
      (realOrFake === 1 || realOrFake === 2) &&
      parseInt(selectedConfidence) !== 0;

    setDisableButton(isDisabled);
  }, [realOrFake, selectedConfidence]);

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    if (!(realOrFake && selectedConfidence)) {
      return;
    }

    const answer = {
      imageId: questions[questionIndex].id,
      guess: realOrFake === 1 ? 0 : 1,
      isWithContext: questions[questionIndex].isWithContext,
      confidenceLevel: selectedConfidence,
      submitted: new Date(),
      participantId: 1,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);
    setShowContent(false);
    setRealorFake(0);
    setSelectedConfidence(0);
    document.getElementById("options").value = "";
    document.getElementById("deepfake").value = "";
    generateRandomNumber();
  };

  const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    setLastSeen(randomNum);
  };

  useEffect(() => {
    if (!showContent) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <div className="md:gap-4">
      <div className="transition-opacity duration-500">
        {questions && questions.length > 1 && twitterData.length > 0 && (
          <Tweet
            url={questions[questionIndex].url}
            context={questions[questionIndex].context}
            questionIndex={questionIndex}
            lastSeen={lastSeen}
            twitterName={twitterData[questionIndex].name}
          />
        )}
      </div>
      <div>
        <div>
          <div>
            <div className="pt-4 flex pb-2">
              <img
                src="src/assets/default-profile.png"
                alt=""
                className="h-12 w-12 rounded-full mr-4"
              />
              <div className="w-full h-28">
                <Transition
                  show={showContent}
                  enter="transition-opacity duration-1000 ease-in-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-600 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div>
                    <p className="p-1 text-lg">
                      I believe the above image is{" "}
                      <select
                        id="deepfake"
                        className="bg-black"
                        onChange={(e) => setRealorFake(e.target.value)}
                      >
                        <option value="" disabled selected>
                          ...
                        </option>
                        <option value="1">real</option>
                        <option value="2">fake</option>
                      </select>
                    </p>
                    <p className="p-1 text-lg">
                      I am{" "}
                      <select
                        id="options"
                        onChange={(e) => setSelectedConfidence(e.target.value)}
                        className="bg-black"
                      >
                        <option value="" disabled selected>
                          ...
                        </option>
                        <option value="1">not very confident</option>
                        <option value="2">somewhat confident</option>
                        <option value="3">mostly confident</option>
                        <option value="4">100% confident</option>
                      </select>{" "}
                      in my answer
                    </p>
                    <div className="flex justify-end mt-1">
                      <button
                        className="bg-twitterblue px-3 py-2 rounded-full text-white font-bold"
                        onClick={handleNextQuestion}
                        disabled={disableButton}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-300 mt-4"></div>
        </div>
      </div>
    </div>
  );
}
