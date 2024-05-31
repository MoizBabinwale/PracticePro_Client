import { useState, useEffect, useContext } from "react";
import AddQuestions from "./AddQuestions";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { createNewTest, getAllSubjects, getDifficultyLevel, getTimeLimits } from "../actions/testAction";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { TEST_API } from "../actions/api";
import { testHeaders } from "../actions/testAction";
import { CiEdit } from "react-icons/ci";
import Loader from "./Loader";

const CreateTest = () => {
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const [testId, setTestId] = useState("");
  const [testName, setTestName] = useState("");
  const [topicId, setTopicId] = useState("");
  const [topicName, setTopicName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [listTopics, setListTopics] = useState([]);
  // const [times, setTimes] = useState([]);
  const [testList, setTestList] = useState([]);
  const [enableEditQuestion, setEnableEditQuestion] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleOpen = (value) => setSize(value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const TopicChange = (newValue) => {
    var checked = document.getElementById("topic_" + newValue).checked;
    if (checked) {
      setSelectedTopics([...selectedTopics, newValue]); // Update the selected topics array
    } else {
      const filterTopic = selectedTopics.filter((item) => item !== newValue);
      setSelectedTopics(filterTopic);
    }
  };
  const getTest = useSelector((state) => state.test);

  // const { isLoggedIn, isAdmin } = useContext(AuthContext);
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("Profile"));
    if (isLoggedIn) {
      setLoading(true);
      dispatch(getAllSubjects());
      dispatch(getDifficultyLevel());
      dispatch(getTimeLimits());
      getAllTest();
      setLoading(false);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    var topics = getTest.subjects.data;
    // var times = getTest.time.allTimeLimit;

    if (topics) {
      setTopics(topics);
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
        console.log(response);
        setListTopics(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      setListTopics([]);
    }
  };

  const handleTopicChange = (value) => {
    if (value) {
      setTopicId(value._id);
      setTopicName(value.name);
    }
  };

  const hadleCreateNewTopic = async () => {
    try {
      var subjectName = document.getElementById("topicName").value;
      var description = document.getElementById("description").value;
      const response = await axios.post(TEST_API + "/createSubject", { name: subjectName, description }, testHeaders); // Await the axios request
      if (response) {
        document.getElementById("closeTopicBtn").click();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Topic Created Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch(getAllSubjects());
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const hadleCreateNewTime = async () => {
    var time = document.getElementById("time").value;
    var tempTime = Number.parseInt(time);
    if (tempTime >= 20 && tempTime % 10 === 0 && tempTime < 60) {
      try {
        setLoading(true);

        const response = await axios.post(
          TEST_API + "/createTimeLimit",
          {
            time,
          },
          testHeaders
        ); // Await the axios request
        if (response) {
          document.getElementById("closeTimeBtn").click();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Time Limit Created Successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          dispatch(getTimeLimits());
          setLoading(false);
        }
      } catch (error) {
        console.log("error ", error);
      }
    } else {
      document.getElementById("closeTimeBtn").click();
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Time Limit Should be in between 20-60 and must be a X10!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  };

  const hadleCreateNewDifficulty = async () => {
    try {
      var difficultyName = document.getElementById("difficultyName").value;
      const response = await axios.post(TEST_API + "/createDifficulty", { level: difficultyName }, testHeaders); // Await the axios request
      if (response) {
        document.getElementById("closeDiffiBtn").click(); // Access response.data for the actual data
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Exam Created Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("error ", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went Wrong!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const hadleCreateNewExam = async () => {
    var examName = document.getElementById("ExamName").value;

    try {
      const response = await axios.post(TEST_API + "/createTest", { testName: examName, subjectId: selectedTopics, questionIds: [] }, testHeaders);
      if (response.status === 201) {
        document.getElementById("closeExamBtn").click(); // Access response.data for the actual data
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Topic Created Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        getAllTest();
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const getAllQuestions = async () => {
    try {
      setEnableEditQuestion(!enableEditQuestion);
      const response = await axios.post(TEST_API + "/getQuestion", { subjectId: topicId, testId }, testHeaders);
      if (response) {
        setQuestions(response.data.questions);
      }
    } catch (error) {
      console.log("error ", error);
      setQuestions([]);
    }
  };

  return (
    <div className={loading ? "blur container " : "container "}>
      {loading && <Loader />}
      <div className="inline-flex flex-wrap mx-4 gap-5 md:max-w-fit">
        <Button className="bg-none text-black shadow-md border-2 border-blue-300 px-2 py-1" onClick={() => handleOpen("topic")} variant="gradient">
          New Topic
        </Button>
        <Button className="bg-none text-black shadow-md border-2 border-blue-300 px-2 py-1" onClick={() => handleOpen("ExamModal")} variant="gradient">
          New Exam Name
        </Button>

        <Button className="bg-none text-black shadow-md border-2 border-blue-300 px-2 py-1" onClick={() => handleOpen("Time")} variant="gradient">
          New Time Limit
        </Button>

        <Button className="bg-none text-black shadow-md border-2 border-blue-300 px-2 py-1" onClick={() => handleOpen("Difficulty")} variant="gradient">
          New Difficulty Level
        </Button>

        <Button className="bg-none text-black shadow-md border-2 border-blue-300 px-2 py-1" onClick={() => window.location.reload()} variant="gradient">
          Clear Test
        </Button>

        {/* <div data-dialog-backdrop="dialog-sm" data-dialog-backdrop-close="true" className="pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300">
          <div data-dialog="dialog-sm" className="relative m-4 w-1/3 min-w-[33.333333%] max-w-[33.333333%] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
            <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">Its a simple dialog.</div>
            <div className="relative p-4 font-sans text-base antialiased font-light leading-relaxed border-t border-b border-t-blue-gray-100 border-b-blue-gray-100 text-blue-gray-500">
              The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I&apos;m never giving up, I&apos;m just getting started. I&apos;m up to something. Fan luv.
            </div>
            <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
              <button
                data-ripple-dark="true"
                data-dialog-close="true"
                className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
              <button
                data-ripple-light="true"
                data-dialog-close="true"
                className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <div className="ax-auto row mt-3 items-center justify-center">
        <div className=" relative z-0  group col-lg-3">
          <Autocomplete
            className=""
            onChange={(e, value) => handleTestNameChange(value)}
            options={testList || []}
            getOptionLabel={(option) => option.testName || ""}
            value={{
              _id: testId,
              testName: testName,
            }}
            renderInput={(params) => <TextField {...params} value={topicName} variant="standard" placeholder="Select Exam Name" />}
            disabled={enableEditQuestion}
          />

          <label className="flex justify-between items-center peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            New Test Name
          </label>
        </div>

        <div className="col-lg-3">
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
            disabled={enableEditQuestion}
          />
        </div>
        <div className="col-lg-3">
          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => getAllQuestions()}
          >
            {enableEditQuestion ? "Edit" : "Submit"}
          </button>
        </div>
      </div>

      {enableEditQuestion && <AddQuestions testId={testId} topicId={topicId} testData={questions} getAllQuestions={getAllQuestions} />}

      {/* <Dialog open={size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl" || size === "xxl"} size={size || "md"} handler={handleOpen}> */}

      <Dialog className="max-w-sm justify-center items-center" open={size === "topic"} size={"sm"} handler={handleOpen}>
        <DialogHeader>Create New Topic</DialogHeader>
        <DialogBody>
          <input className="  border-white   mb-3  rounded-md  px-3 py-2 w-100" style={{ background: "rgb(228 237 255)" }} placeholder="Enter Topic Name" id="topicName" />
          <input className=" border-white   px-3 py-2 w-100 rounded-md" style={{ background: "rgb(228 237 255)" }} placeholder="Enter Description" id="description" />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" id="closeTopicBtn" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => hadleCreateNewTopic()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog className="max-w-sm justify-center items-center" open={size === "Time"} size={"sm"} handler={handleOpen}>
        <DialogHeader>Create New Difficulty</DialogHeader>
        <DialogBody>
          <input className="  border-none  mb-3  rounded-md  px-3 py-2 w-100" style={{ background: "rgb(228 237 255)" }} placeholder="Enter Time" id="time" />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Note!</span> Please Write the timing in order of 10,20,30...etc.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" id="closeTimeBtn" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => hadleCreateNewTime()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog className="max-w-sm justify-center items-center" open={size === "Difficulty"} size={"sm"} handler={handleOpen}>
        <DialogHeader>Create New Topic</DialogHeader>
        <DialogBody>
          <input className="  border-none  mb-3  rounded-md  px-3 py-2 w-100" style={{ background: "rgb(228 237 255)" }} placeholder="Enter New Difficulty" id="difficultyName" />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" id="closeDiffiBtn" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => hadleCreateNewDifficulty()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog className="max-w-sm justify-center items-center" open={size === "ExamModal"} size="md" handler={handleOpen}>
        <DialogHeader>Create New Exam</DialogHeader>
        <DialogBody>
          <input className="  border-white   mb-3  rounded-md  px-3 py-2 w-100" style={{ background: "rgb(228 237 255)" }} placeholder="Enter Exam Name" id="ExamName" />
          <div className="h-[130px] overflow-auto">
            {topics ? (
              <ul>
                {topics.map((topic, index) => (
                  <li key={index} className="dropdown-item">
                    <label className="flex cursor-pointer">
                      <input type="checkbox" id={`topic_${topic?._id}`} value={topic?._id} checked={selectedTopics.includes(topic?._id)} onChange={() => TopicChange(topic?._id)} />
                      <p className="ml-2">{topic?.name}</p>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Please Create New Topics for the Exams</p>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" id="closeExamBtn" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => hadleCreateNewExam()}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to
                comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
              </p>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
