import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TEST_API } from "../actions/api";
import axios from "axios";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { getDifficultyLevel, getTimeLimits, testHeaders } from "../actions/testAction";
import manImage from "../assets/man.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

function GiveTest() {
  const [testName, setTestName] = useState("");
  const [testList, setTestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listTopics, setListTopics] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [difficultyName, setDifficultyName] = useState("");
  const [difficultyId, setDifficultyId] = useState("");
  const [testId, setTestId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [topicName, setTopicName] = useState("");
  const [timelist, setTimeList] = useState([]);
  const [timeName, setTimeName] = useState("");
  const [timeId, setTimeId] = useState("");
  const [premiumUser, setNotPremiumUser] = useState(false);
  const { isPremiumUser } = useContext(AuthContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    dispatch(getTimeLimits());
    dispatch(getDifficultyLevel());
    getAllTest();
  }, []);
  useEffect(() => {
    setNotPremiumUser(isPremiumUser);
  }, [isPremiumUser]);

  const getTest = useSelector((state) => state.test);

  useEffect(() => {
    var difficulties = getTest.difficulties.difficultyLevels;
    var timelimits = getTest.time.allTimeLimit;
    if (difficulties) {
      setDifficulties(difficulties);
    }
    if (timelimits) {
      setTimeList(timelimits);
    }
  }, [getTest]);

  const getAllTest = async () => {
    try {
      const response = await axios.get(TEST_API + "/getAllTest");

      if (response) {
        setTestList(response.data.Tests);
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };

  const handleTimeChange = (value) => {
    setTimeName(value.time);
    setTimeId(value._id);
  };

  const handleNumQuestionsChange = (event) => {
    if (event.keyCode === 109) {
      event.preventDefault();
    }
  };

  const handleDifficultyLevelChange = (value) => {
    setDifficultyName(value.level);
    setDifficultyId(value._id);
  };

  const startDemoTest = () => {
    localStorage.setItem("testData", JSON.stringify("DemoTest"));
    navigate("/startTest");
  };

  const handleStartTest = () => {
    setLoading(true);
    if (!premiumUser) {
      startDemoTest();
      return;
    }
    // Handle starting the test
    var numberOfQuestions = document.getElementById("numberOfQuestions").value;
    if (!numberOfQuestions || !testId || !topicId || !timeId || !difficultyId) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please Enter All the fields!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const testData = {
      testId,
      topicId,
      timeId,
      difficultyId,
      numberOfQuestions,
      testName,
      timeName,
    };

    localStorage.setItem("testData", JSON.stringify(testData));
    setLoading(false);
    navigate("/startTest");
  };

  const handleTestNameChange = (value) => {
    setTestId(value._id);
    setTestName(value.testName);
    getTopicName(value._id);
  };

  const getTopicName = async (testId) => {
    try {
      console.log("testHeaders ", testHeaders);
      const response = await axios.get(TEST_API + `/getSubjects/${testId}`, testHeaders); // Await the axios request
      if (response) {
        setListTopics(response.data);
      }
    } catch (error) {
      console.log("error ", error);
      setListTopics([]);
      setLoading(false);
    }
  };

  const handleTopicChange = (value) => {
    if (value) {
      setTopicId(value._id);
      setTopicName(value.name);
    }
  };

  return (
    <div className="container ">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-lg-6 p-0 justify-center flex bg-white md:block">
            <img src={manImage} className="md:w-full h-[280px] md:h-auto w-[280px]" alt="" />
          </div>
          <div role="region" aria-disabled="true" className="col-lg-6 bg-white pt-10 flex md:items-center md:justify-center  justify-normal  flex-col ">
            {!premiumUser && (
              <div className="flex justify-start items-start w-[70%]">
                <p className="text-red-600 items-start justify-start">* Enable Premium To unlock All Feature!</p>
              </div>
            )}
            <div className="col-lg-8 my-3">
              <label>Exam Name</label>
              <Autocomplete
                onChange={(e, value) => handleTestNameChange(value)}
                options={testList || []}
                getOptionLabel={(option) => option.testName || ""}
                value={{
                  _id: testId,
                  testName: testName,
                }}
                renderInput={(params) => <TextField {...params} value={testName} variant="standard" placeholder="Select Exam Name" />}
                disabled={!premiumUser}
              />
            </div>

            <div className="col-lg-8 my-3">
              <label>Topics </label>
              <Autocomplete
                className=""
                onChange={(e, value) => handleTopicChange(value)}
                options={listTopics || []}
                getOptionLabel={(option) => option.name || ""}
                value={{
                  _id: topicId,
                  name: topicName,
                }}
                renderInput={(params) => <TextField {...params} value={topicName} variant="standard" placeholder="Select Topic" />}
                disabled={!premiumUser}
              />
            </div>
            <div className="col-lg-8 my-3">
              <label>Time</label>
              <Autocomplete
                className=""
                onChange={(e, value) => handleTimeChange(value)}
                options={timelist || []}
                getOptionLabel={(option) => option.time || ""}
                value={{
                  _id: timeId,
                  time: timeName,
                }}
                renderInput={(params) => <TextField {...params} value={timeName} variant="standard" placeholder="Select Time" />}
                disabled={!premiumUser}
              />
            </div>
            {/* <TextField type="number" value={time} onChange={handleTimeChange} label="Time (in minutes)" variant="standard" placeholder="Enter Time" /> */}
            <div className="col-lg-8 my-3">
              <TextField
                type="number"
                className="w-full"
                min="1"
                id="numberOfQuestions"
                disabled={!premiumUser}
                onKeyDown={handleNumQuestionsChange}
                label="Number of Questions"
                variant="standard"
                placeholder="Enter Number of Questions"
              />
            </div>

            <div className="col-lg-8 my-3">
              <label>Difficulty</label>
              <Autocomplete
                onChange={(e, value) => handleDifficultyLevelChange(value)}
                options={difficulties || []}
                getOptionLabel={(option) => option.level || ""}
                value={{
                  _id: difficultyId,
                  level: difficultyName,
                }}
                renderInput={(params) => <TextField {...params} variant="standard" placeholder="Select Difficulty Level" />}
                disabled={!premiumUser}
              />
            </div>
            <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleStartTest()}>
              {!premiumUser ? "Start Demo Test" : "Start Test"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiveTest;
