import { useEffect, useState } from "react";
import Tweet from "./Tweet";
import CryptoJS from "crypto-js";
import Spinner from "./Spinner";
import defaultProfile from "../assets/default-profile.png";
import Error from "./Error.jsx";

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
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState();
  const secretKey = "secret_key";
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {
    const storedParticipantId = localStorage.getItem("participantId");
    if (storedParticipantId) {
      setParticipantId(parseInt(storedParticipantId));
    }
  }, []);

  // Get question data from session storage, if it is present then decrypt it and set the questions to the Question state
  // If it is not present then make an API call to retrieve it, then encrypt and store in session storage
  useEffect(() => {
    const storedEncryptedData = sessionStorage.getItem("questions");
    if (storedEncryptedData) {
      try {
        const decryptedQuestions = CryptoJS.AES.decrypt(
          storedEncryptedData,
          secretKey,
        ).toString(CryptoJS.enc.Utf8);
        const parsedQuestions = JSON.parse(decryptedQuestions);
        setQuestions(parsedQuestions);
        setIsLoading(false);
      } catch (error) {
        setError({
          message: "Could not fetch questions. Please try again later.",
        });
      }
    } else {
      const fetchImages = async () => {
        try {
          const storedParticipantId = localStorage.getItem("participantId");
          const response = await fetch(
            `https://${baseUrl}/api/images/${storedParticipantId}`,
          );

          const data = await response.json();
          const json = JSON.stringify(data);
          setQuestions(JSON.parse(json));

          encryptQuestionData(json, data);
          setIsLoading(false);
        } catch (error) {
          setError({
            message: "Could not fetch questions. Please try again later.",
          });
        }
      };

      fetchImages().catch((error) => setError(error));
    }
  }, [baseUrl]);

  useEffect(() => {
    async function fetchTwitterData() {
      try {
        const storedTwitterData = sessionStorage.getItem("twitterData");

        if (storedTwitterData) {
          setTwitterData(JSON.parse(storedTwitterData));
        } else {
          const response = await fetch(`https://${baseUrl}/api/profile-data`);

          const data = await response.json();
          setTwitterData(data);
          sessionStorage.setItem("twitterData", JSON.stringify(data));
        }
      } catch (error) {
        setError({
          message: "Could not fetch required data. Please try again later.",
        });
      }
    }
    fetchTwitterData().catch((error) => setError(error));
  }, [baseUrl]);

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

    // Reset values
    setRealOrFake(0);
    setSelectedConfidence(0);
    document.getElementById("options").value = "";
    document.getElementById("deepfake").value = "";
    generateRandomNumber();
  };

  const handleSubmitAnswers = async () => {
    try {
      let json = JSON.stringify(answers);
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
        setShowScore(true);
      }
    } catch (error) {
      setError({
        message: "Could not submit answers. Please try again later.",
      });
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

  // If data does not exist in session storage, then encrypt it and store in local storage
  function encryptQuestionData(json, data) {
    const encryptedData = CryptoJS.AES.encrypt(json, secretKey).toString();
    sessionStorage.setItem("questions", encryptedData);
    setQuestions(data);
  }

  useEffect(() => {
    const isDisabled = realOrFake === 0 || selectedConfidence === 0;
    setDisableButton(isDisabled);
  }, [realOrFake, selectedConfidence]);

  // useEffect(() => {
  //   console.log("Answers:", answers);
  // }, [answers]);

  if (error) {
    return <Error title="An error occurred." message={error.message} />;
  }

  return (
    <div className="md:border-x border-grayedout border-opacity-50 top-0 bottom-0 min-h-screen">
      <div className="relative">
        <div className="p-6">
          <div className="transition-opacity duration-500">
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              questions &&
              questions.length > 0 &&
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
                      gender={twitterData[questionIndex].gender}
                    />
                  )}
                  {answers.length === 20 && (
                    <div>
                      {!answersResponse.length > 0 && (
                        <div className="flex justify-center items-center pt-56">
                          <div className="flex justify-center">
                            <button
                              onClick={handleSubmitAnswers}
                              className="w-40 h-40 md:w-56 md:h-56 bg-amber-400 text-black border focus:ring-4 focus:outline-none focus:ring-gray-300 md:text-lg font-medium rounded-full text-sm md:px-10 md:py-7 px-5 py-2.5 text-center me-2 mb-2 border-gray-600 hover:bg-amber-300"
                            >
                              Submit answers and get results
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col h-screen">
                        <div className="flex-grow overflow-y-auto">
                          <div className="container">
                            {showScore && (
                              <p className="pb-2">Score: {score}/20</p>
                            )}
                            {answersResponse.map((item, i) => (
                              <div key={i} className="pb-4">
                                <img
                                  src={item.imageUrl}
                                  className="rounded-xl pb-1"
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
                      src={defaultProfile}
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
                        <div className="flex justify-between mt-1 items-center">
                          <p className="italic font-bold">
                            {answers.length + 1}/20
                          </p>
                          <button
                            className={`bg-twitterblue px-3 py-2 md:px-5 md:py-3 text-sm md:text-md rounded-full text-white font-bold ${
                              disableButton ? "opacity-50" : ""
                            }`}
                            onClick={handleNextQuestion}
                            disabled={disableButton}
                          >
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full border-t border-grayedout mt-6 border-opacity-50 absolute left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
