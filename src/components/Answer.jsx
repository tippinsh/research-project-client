import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import CryptoJS from "crypto-js";
import Spinner from "./Spinner";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [realOrFake, setRealorFake] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedConfidence, setSelectedConfidence] = useState(0);
  const [lastSeen, setLastSeen] = useState(5);
  const [twitterData, setTwitterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [participantId, setParticipantId] = useState(0);
  const secretKey = "secret_key";

  useEffect(() => {
    const storedParticipantId = localStorage.getItem("participantId");
    if (storedParticipantId) {
      setParticipantId(storedParticipantId);
    }
  }, []);

  async function fetchImages() {}

  useEffect(() => {
    const storedEncryptedData = localStorage.getItem("questions");
    if (storedEncryptedData) {
      try {
        const decryptedQuestions = CryptoJS.AES.decrypt(
          storedEncryptedData,
          secretKey
        ).toString(CryptoJS.enc.Utf8);
        const parsedQuestions = JSON.parse(decryptedQuestions);
        setQuestions(parsedQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting questions", error);
      }
    } else {
      async function fetchImages() {
        try {
          const storedParticipantId = localStorage.getItem("participantId");

          if (!storedParticipantId) {
            throw new Error("Participant ID not found in local storage");
          }

          const response = await fetch(
            `http://localhost:8080/api/images/${storedParticipantId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }

          const data = await response.json();
          const jsonData = JSON.stringify(data);
          const encryptedData = CryptoJS.AES.encrypt(
            jsonData,
            secretKey
          ).toString();

          localStorage.setItem("questions", encryptedData);
          setQuestions(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }

      fetchImages();
    }
  }, []);

  useEffect(() => {
    console.log(answers, participantId);
  }, [answers, participantId]);

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
    const isDisabled = realOrFake === 0 || selectedConfidence === 0;
    setDisableButton(isDisabled);
  }, [realOrFake, selectedConfidence]);

  const handleNextQuestion = () => {
    if (!(realOrFake && selectedConfidence)) {
      return;
    }

    const answer = {
      imageId: questions[questionIndex].id,
      guess: realOrFake === 1 ? 0 : 1,
      isWithContext: questions[questionIndex].isWithContext,
      confidenceLevel: selectedConfidence,
      submitted: new Date(),
      participantId: participantId,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    setRealorFake(0);
    setSelectedConfidence(0);
    document.getElementById("options").value = "";
    document.getElementById("deepfake").value = "";
    generateRandomNumber();
    console.log(answers);
  };

  const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    setLastSeen(randomNum);
  };

  return (
    <div className="border-x border-grayedout border-opacity-50 top-0 bottom-0 min-h-screen">
      <div className="relative">
        <div className="p-6">
          <div className="transition-opacity duration-500">
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              questions &&
              questions.length > 1 &&
              twitterData.length > 0 && (
                <Tweet
                  url={questions[questionIndex].url}
                  context={questions[questionIndex].context}
                  questionIndex={questionIndex}
                  isWithContext={questions[questionIndex].isWithContext}
                  lastSeen={lastSeen}
                  twitterName={twitterData[questionIndex].name}
                  comments={questions[questionIndex].numComments}
                  retweets={questions[questionIndex].numRetweets}
                  likes={questions[questionIndex].numLikes}
                  bookmarked={questions[questionIndex].numBookmarked}
                  views={questions[questionIndex].numViews}
                />
              )
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
                    <div>
                      <p className="p-1 text-md md:text-lg">
                        I believe the above image is{" "}
                        <select
                          id="deepfake"
                          className="bg-black"
                          value={realOrFake}
                          onChange={(e) => setRealorFake(e.target.value)}
                        >
                          <option value="0" disabled>
                            ...
                          </option>
                          <option value={1}>real</option>
                          <option value={2}>fake</option>
                        </select>
                      </p>
                      <p className="p-1 text-md md:text-lg">
                        I am{" "}
                        <select
                          id="options"
                          onChange={(e) =>
                            setSelectedConfidence(e.target.value)
                          }
                          className="bg-black"
                          value={selectedConfidence}
                        >
                          <option value="0" disabled>
                            ...
                          </option>
                          <option value={1}>not very confident</option>
                          <option value={2}>somewhat confident</option>
                          <option value={3}>mostly confident</option>
                          <option value={4}>100% confident</option>
                        </select>{" "}
                        in my answer
                      </p>
                      <div className="flex justify-end mt-1">
                        <button
                          className={`bg-twitterblue px-3 py-2 md:px-5 md:py-3 text-sm md:text-md rounded-full text-white font-bold ${
                            disableButton ? "opacity-50" : ""
                          }`}
                          onClick={handleNextQuestion}
                          disabled={disableButton}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full border-t border-grayedout mt-5 border-opacity-50 absolute left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
