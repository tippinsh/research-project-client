import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import CryptoJS from "crypto-js";
import Spinner from "./Spinner";

export default function Answer() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answersResponse, setAnswersResponse] = useState([]);
  const [realOrFake, setRealOrFake] = useState(0);
  const [disableButton, setDisableButton] = useState(true);
  const [selectedConfidence, setSelectedConfidence] = useState(0);
  const [lastSeen, setLastSeen] = useState(5);
  const [twitterData, setTwitterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [participantId, setParticipantId] = useState(0);
  const [score, setScore] = useState(0);
  const secretKey = "secret_key";
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  // Get participant id and store in local storage
  useEffect(() => {
    const storedParticipantId = localStorage.getItem("participantId");
    if (storedParticipantId) {
      setParticipantId(parseInt(storedParticipantId));
    }
  }, []);

  // Get question data from local storage, if it is present then decrypt it and set the questions to the Question state
  // If it is not present then make an API call to retrieve it, then encrypt and store in local storage
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
      const fetchImages = async () => {
        try {
          const storedParticipantId = localStorage.getItem("participantId");
          const response = await fetch(
            `https://${baseUrl}/api/images/${storedParticipantId}`
          );

          const data = await response.json();
          const json = JSON.stringify(data);

          encryptQuestionData(json, data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      fetchImages().catch((error) =>
        console.error("Error fetching images:", error)
      );
    }
  }, []);

  // If data does not exist in local storage, then encrypt it and store in local storage
  function encryptQuestionData(json, data) {
    const encryptedData = CryptoJS.AES.encrypt(json, secretKey).toString();
    localStorage.setItem("questions", encryptedData);
    setQuestions(data);
  }

  useEffect(() => {
    async function fetchTwitterData() {
      try {
        const storedTwitterData = localStorage.getItem("twitterData");

        if (storedTwitterData) {
          setTwitterData(JSON.parse(storedTwitterData));
        } else {
          const response = await fetch(`https://${baseUrl}/api/profile-data`);

          const data = await response.json();
          setTwitterData(data);
          localStorage.setItem("twitterData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching twitter data:", error);
      }
    }
    fetchTwitterData().catch((error) =>
      console.error("Error fetching twitter data:", error)
    );
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
      guess: realOrFake,
      isWithContext: questions[questionIndex].isWithContext,
      confidenceLevel: selectedConfidence,
      submitted: new Date(),
      participantId: participantId,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    setRealOrFake(0);
    setSelectedConfidence(0);
    document.getElementById("options").value = "";
    document.getElementById("deepfake").value = "";
    generateRandomNumber();
    console.log(answers);
  };

  const handleSubmitAnswers = async () => {
    try {
      var json = JSON.stringify(answers);
      console.log(json);
      const response = await fetch(`https://${baseUrl}/api/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (response.ok) {
        const data = await response.json();
        setAnswersResponse(data);
        calculateScore(data);
      }
    } catch (error) {
      console.error("Error submitting answers", error);
    }
  };

  const generateRandomNumber = () => {
    let randomNum = Math.floor(Math.random() * 20) + 1;
    setLastSeen(randomNum);
  };

  const calculateScore = (data) => {
    let numCorrect = 0;
    data.forEach((a) => {
      if (a.isCorrect) {
        numCorrect++;
      }
      setScore(numCorrect);
    });
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
                <>
                  {answers.length !== 20 && (
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
                  )}
                  {answers.length === 20 && (
                    <div>
                      {!answersResponse.length > 0 && (
                        <div className="flex justify-center">
                          <button
                            onClick={handleSubmitAnswers}
                            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                          >
                            Submit answers and get results
                          </button>
                        </div>
                      )}
                      <div className="flex flex-col h-screen">
                        <div className="flex-grow overflow-y-auto">
                          <div className="container">
                            <p>Score: {score}/20</p>
                            {answersResponse.map((item, i) => (
                              <div key={i} className="pb-4">
                                <img
                                  src={item.imageUrl}
                                  alt={`Image ${item.id}`}
                                />
                                <p>
                                  You are{" "}
                                  {item.isCorrect ? "correct" : "incorrect"},
                                  the image is{" "}
                                  {item.isDeepFake ? "fake" : "real"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )
            )}
          </div>
          <div>
            <div>
              {answers.length !== 20 && (
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
                            onChange={(e) =>
                              setRealOrFake(Number(e.target.value))
                            }
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
                              setSelectedConfidence(Number(e.target.value))
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
              )}
              <div className="w-full border-t border-grayedout mt-5 border-opacity-50 absolute left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
