import React, { useEffect, useState } from "react";
import { TEST_API, baseUrl } from "../actions/api";
import { evaluateResult, resetResult, testHeaders } from "../actions/testAction";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function StartTest() {
  const [testData, setTestData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [resultFetched, setResultFetched] = useState({});
  const [gettingData, setGettingData] = useState(false);
  const [sendingData, setSendingData] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const testInfo = JSON.parse(localStorage.getItem("testData"));
    if (testInfo) {
      const initialTimeLeft = testInfo?.timeName ? testInfo.timeName * 60 : 600; // Convert minutes to seconds
      let savedTimeLeft = parseInt(localStorage.getItem("timeLeft"), 10);

      if (!savedTimeLeft || savedTimeLeft <= 0) {
        savedTimeLeft = initialTimeLeft;
        localStorage.setItem("timeLeft", savedTimeLeft.toString());
      }

      console.log("testInfo.timeName ", testInfo.timeName);
      console.log("initialTimeLeft ", initialTimeLeft);
      console.log("savedTimeLeft ", savedTimeLeft);

      setTimeLimit(initialTimeLeft);
      setTimeLeft(savedTimeLeft);

      if (initialTimeLeft > 0 && savedTimeLeft > 0) {
        const intervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            localStorage.setItem("timeLeft", prevTimeLeft - 1); // Update timeLeft in localStorage
            if (prevTimeLeft === 1) {
              clearInterval(intervalId);
              handleTimeFinished();
              return 0;
            }
            return prevTimeLeft - 1;
          });
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, []);

  const getDemoQuestions = async () => {
    try {
      const response = await axios.get(TEST_API + "/getDemoQuestion", testHeaders); // Assuming your endpoint is at '/api/getDemoQuestion'
      setQuestions(response.data.demoQuestions); // Assuming the response has a 'demoQuestions' property
    } catch (error) {
      console.error("Error fetching demo questions:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("timeLeft", timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    const testInfo = JSON.parse(localStorage.getItem("testData"));

    if (testInfo === "DemoTest") {
      var demoTestInfo = {
        testName: "Demo Test",
      };
      setTestData(demoTestInfo);
      // Setting 5 general knowledge questions
      const demoQuestions = [
        {
          _id: "66598337ca26bd8ef579a3c1",
          text: "What is the capital of France?",
          difficultyLevel: "65e013bc6b8fc10cabbcf490",
          optionType: "text",
          options: [
            { _id: "66598337ca26bd8ef579a3c2", text: "Berlin", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3c3", text: "Madrid", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3c4", text: "Paris", isCorrect: true },
            { _id: "66598337ca26bd8ef579a3c5", text: "Rome", isCorrect: false },
          ],
          subjectId: "665970d1e1395361e2180b2d",
          testId: "665970e4e1395361e2180b30",
          __v: 0,
        },
        {
          _id: "66598337ca26bd8ef579a3c6",
          text: "Who wrote 'Romeo and Juliet'?",
          difficultyLevel: "65e013bc6b8fc10cabbcf490",
          optionType: "text",
          options: [
            { _id: "66598337ca26bd8ef579a3c7", text: "Mark Twain", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3c8", text: "Jane Austen", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3c9", text: "William Shakespeare", isCorrect: true },
            { _id: "66598337ca26bd8ef579a3ca", text: "Charles Dickens", isCorrect: false },
          ],
          subjectId: "665970d1e1395361e2180b2d",
          testId: "665970e4e1395361e2180b30",
          __v: 0,
        },
        {
          _id: "66598337ca26bd8ef579a3cb",
          text: "What is the largest planet in our Solar System?",
          difficultyLevel: "65e013bc6b8fc10cabbcf490",
          optionType: "text",
          options: [
            { _id: "66598337ca26bd8ef579a3cc", text: "Earth", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3cd", text: "Mars", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3ce", text: "Jupiter", isCorrect: true },
            { _id: "66598337ca26bd8ef579a3cf", text: "Saturn", isCorrect: false },
          ],
          subjectId: "665970d1e1395361e2180b2d",
          testId: "665970e4e1395361e2180b30",
          __v: 0,
        },
        {
          _id: "66598337ca26bd8ef579a3d0",
          text: "How many continents are there?",
          difficultyLevel: "65e013bc6b8fc10cabbcf490",
          optionType: "text",
          options: [
            { _id: "66598337ca26bd8ef579a3d1", text: "Five", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3d2", text: "Six", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3d3", text: "Seven", isCorrect: true },
            { _id: "66598337ca26bd8ef579a3d4", text: "Eight", isCorrect: false },
          ],
          subjectId: "665970d1e1395361e2180b2d",
          testId: "665970e4e1395361e2180b30",
          __v: 0,
        },
        {
          _id: "66598337ca26bd8ef579a3d5",
          text: "What is the boiling point of water?",
          difficultyLevel: "65e013bc6b8fc10cabbcf490",
          optionType: "text",
          options: [
            { _id: "66598337ca26bd8ef579a3d6", text: "90°C", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3d7", text: "100°C", isCorrect: true },
            { _id: "66598337ca26bd8ef579a3d8", text: "110°C", isCorrect: false },
            { _id: "66598337ca26bd8ef579a3d9", text: "120°C", isCorrect: false },
          ],
          subjectId: "665970d1e1395361e2180b2d",
          testId: "665970e4e1395361e2180b30",
          __v: 0,
        },
      ];

      setQuestions(demoQuestions);

      return;
    }
    setTestData(testInfo);
    var testId = testInfo?.testId;
    var topicId = testInfo?.topicId;
    var timeName = testInfo?.timeName;
    var difficultyId = testInfo?.difficultyId;
    var questionLimit = testInfo?.numberOfQuestions;
    fetchQuestions(testId, topicId, difficultyId, questionLimit);
  }, []);

  const handleTimeFinished = () => {
    handleSubmit();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const fetchQuestions = async (testId, topicId, difficultyId, questionLimit) => {
    try {
      // Make API call to fetch questions
      const response = await axios.post(
        TEST_API + "/getquestionswithLimit",
        {
          testId,
          topicId,
          difficultyId,
          questionLimit,
        },
        testHeaders
      );
      if (response.status === 201) {
        if (response.data.questions.length > 0) {
          setQuestions(response.data.questions);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No Question Found with selected Parameter ",
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.removeItem("testData");
          localStorage.removeItem("timeLeft");
          navigate("/giveTest");
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
  };

  // Function to handle previous question
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex - 1);
  };

  const setQuestionNumber = (index) => {
    setCurrentQuestionIndex(index);
  };

  const fetchResult = useSelector((state) => state.fetchresult);
  useEffect(() => {
    if (fetchResult) {
      setResultFetched(fetchResult.result);
      // setGettingData(fetchResult.retrievingResult);
      // setSendingData(fetchResult.sendingData);
    }
  }, [fetchResult]);
  const handleSubmit = () => {
    const testInfo = JSON.parse(localStorage.getItem("testData"));

    if (testInfo === "DemoTest") {
      let newScore = 0;
      questions.forEach((question) => {
        const selectedOption = question.options.find((option) => option._id === question.selectedOption);
        if (selectedOption && selectedOption.isCorrect) {
          newScore += 1;
        }
      });
      setResultFetched({ score: newScore });
    } else {
      document.getElementById("submitTest").disabled = true;
      try {
        const answerData = {
          questions,
        };
        dispatch(evaluateResult(answerData));
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("testData");
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    const newData = questions.map((question) => {
      if (question._id === questionId) {
        return {
          ...question,
          selectedOption: optionId,
        };
      } else {
        return question;
      }
    });
    setQuestions(newData);
  };
  const handleResetData = () => {
    dispatch(resetResult());
  };

  const { width, height } = useWindowSize();
  return (
    <div className="container">
      {gettingData || sendingData || resultFetched ? (
        <div className={`top-0 left-0 w-full h-full flex flex-col justify-center items-center ${resultFetched ? "flex mt-36" : "fixed"}`}>
          <Confetti width={width} height={height} recycle={false} />
          {gettingData && <div className="font-semibold">Getting Result Ready...!</div>}
          {sendingData && <div className="font-semibold">Sending Data...</div>}
          {resultFetched && (
            <div className="text-green-600 font-semibold">
              Result Fetched Successfully...!
              <br />
              <p className="text-black items-center">Total Score : {resultFetched.score}</p>
              <Link to="/">
                <button className="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleResetData()}>
                  <IoIosHome /> &nbsp;&nbsp; Go to Home Page
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {!resultFetched && (
        <div className={`${gettingData || sendingData ? "blur" : ""}`}>
          <div className="my-2 py-3 shadow-md px-4">
            <h1 className="font-bold ">Exam Name : {testData?.testName}</h1>
            <div>Time Left: {formatTime(timeLeft)}</div>
          </div>

          <div className="mt-7 md:mx-3 md:pl-2 pt-4 md:flex-row gap-3 md:gap-0 flex-col" style={{ display: "flex" }}>
            {/* Question map on the right side */}

            {/* Question and options on the left side */}
            <div style={{ flex: 3 }} className="border rounded-md p-4 shadow-md md:border-none md:p-0  h-screen">
              {/* Display current question and options */}
              <h2>Question {currentQuestionIndex + 1}</h2>
              <div className="h-[350px]">
                <div>
                  {questions[currentQuestionIndex]?.text && questions[currentQuestionIndex]?.questionImage ? (
                    <div>
                      {questions[currentQuestionIndex]?.text}
                      <img className="h-[100px] ml-3" height={"100px"} width={"25%"} src={baseUrl + questions[currentQuestionIndex].questionImage} alt="option" />
                    </div>
                  ) : (
                    <>
                      {questions[currentQuestionIndex]?.text.split(".")[1] === "png" || questions[currentQuestionIndex]?.text.split(".")[1] === "jpg" || questions[currentQuestionIndex]?.text.split(".")[1] === "jpeg" ? (
                        <img className="h-[100px] ml-3" height={"100px"} width={"25%"} src={baseUrl + questions[currentQuestionIndex].text} alt="option" />
                      ) : (
                        <p>{questions[currentQuestionIndex]?.text}</p>
                      )}
                    </>
                  )}
                </div>

                {/* Display options */}
                <ul>
                  {questions[currentQuestionIndex]?.options.map((option, index) => (
                    <li className="mt-3 flex items-center gap-3" key={index}>
                      {" "}
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name={`${questions[currentQuestionIndex]._id}`}
                        onChange={() => handleOptionSelect(questions[currentQuestionIndex]._id, option._id)}
                        checked={questions[currentQuestionIndex].selectedOption === option._id} // Add this if you want to control the checked state
                      />
                      {String.fromCharCode(65 + index)}
                      {")"} {option.text.split(".")[1] === "png" || option.text.split(".")[1] === "jpg" || option.text.split(".")[1] === "jpeg" ? <img className="h-[100px] ml-3" height={"100px"} width={"25%"} src={baseUrl + option.text} alt="option" /> : option.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next and previous buttons */}
              <div className="flex flex-wrap relative items-end justify-end gap-2">
                <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm md:text-lg" id="submitTest" onClick={handleSubmit}>
                  Submit
                </button>
                <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm md:text-lg" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                  Previous
                </button>
                <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm md:text-lg" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                  Next
                </button>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p className="text-red-500">*Note Please Do Not Reload/Change the Page while Test is in progress</p>
              <div className="flex flex-wrap gap-3 item-center">
                <div className="flex  items-center	">
                  <div className="border-2 rounded-full bg-green-500 w-5 h-5 mr-2"></div>
                  <span>attempted</span>
                </div>
                <div className="flex items-center	">
                  <div className="border rounded-full bg-blue-600 w-5 h-5  mr-2"></div>
                  <span>current Question</span>&nbsp;&nbsp;
                </div>
                <div className="flex items-center	">
                  <div className="border rounded-full bg-white w-5 h-5  mr-2"></div>
                  <span>not-Attempted</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 p-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {questions.map((item, index) => (
                  <span className={`p-3 rounded-full border-2 cursor-pointer ${item.selectedOption ? "bg-green-500" : ""} ${index + 1 === currentQuestionIndex + 1 ? "bg-blue-600 text-white" : ""}`} onClick={() => setQuestionNumber(index)} key={index}>
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartTest;
