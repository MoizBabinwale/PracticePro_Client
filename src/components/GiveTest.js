import React, { useEffect, useState } from "react";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTest();
    dispatch(getTimeLimits());
    dispatch(getDifficultyLevel());
  }, []);

  const getTest = useSelector((state) => state.test);

  useEffect(() => {
    console.log("getTest ", getTest);
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
        setTestList(response.data.allTests);
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

  const handleStartTest = () => {
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
    navigate("/startTest");
  };

  const handleTestNameChange = (value) => {
    setTestId(value._id);
    setTestName(value.testName);
    getTopicName(value._id);
  };

  const getTopicName = async (testId) => {
    try {
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
          <div className="col-lg-6 p-0">
            <img src={manImage} className="w-full" alt="" />
          </div>
          <div className="col-lg-6 bg-white pt-10 flex items-center justify-center  flex-col ">
            <div className="col-lg-8 my-3">
              <Autocomplete
                onChange={(e, value) => handleTestNameChange(value)}
                options={testList || []}
                getOptionLabel={(option) => option.testName || ""}
                value={{
                  _id: testId,
                  testName: testName,
                }}
                renderInput={(params) => <TextField {...params} value={testName} variant="standard" placeholder="Select Exam Name" />}
              />
            </div>

            <div className="col-lg-8 my-3">
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
              />
            </div>
            <div className="col-lg-8 my-3">
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
              />
            </div>
            {/* <TextField type="number" value={time} onChange={handleTimeChange} label="Time (in minutes)" variant="standard" placeholder="Enter Time" /> */}
            <div className="col-lg-8 my-3">
              <TextField type="text" className="w-full" min="1" id="numberOfQuestions" onKeyDown={handleNumQuestionsChange} label="Number of Questions" variant="standard" placeholder="Enter Number of Questions" />
            </div>

            <div className="col-lg-8 my-3">
              <Autocomplete
                onChange={(e, value) => handleDifficultyLevelChange(value)}
                options={difficulties || []}
                getOptionLabel={(option) => option.level || ""}
                value={{
                  _id: difficultyId,
                  level: difficultyName,
                }}
                renderInput={(params) => <TextField {...params} variant="standard" placeholder="Select Difficulty Level" />}
              />
            </div>
            <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => handleStartTest()}>
              Start Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiveTest;
