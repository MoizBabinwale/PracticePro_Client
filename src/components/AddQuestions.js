import axios from "axios";
import React, { useEffect, useState } from "react";
import { TEST_API } from "../actions/api";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { testHeaders } from "../actions/testAction";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const AddQuestions = ({ testId, topicId, testData, getAllQuestions }) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [quesionCreated, setQuesionCreated] = useState(false);
  const [enableQuestions, setEnableQuestions] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [questionWithImage, setQuestionWithImage] = useState(false);

  const [difficultyId, setDifficultyId] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [difficulties, setDifficulties] = useState([]);
  const [questionsData, setQuestionData] = useState([]);

  const handleEnter = () => {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (testData) {
      console.log("testData ", testData);
      setQuestionData(testData);
    }
  }, [testData]);

  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const updatedImages = [...uploadedImages];
    updatedImages[index] = file;
    setUploadedImages(updatedImages);
  };

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const EditChangeOption = (index, key, value) => {
    const data = [...questionsData];
    const newOptions = data[key].options;
    newOptions[index].text = value;
    setQuestionData(data);
  };

  const getTest = useSelector((state) => state.test);

  useEffect(() => {
    var difficulties = getTest.difficulties.difficultyLevels;
    if (difficulties) {
      setDifficulties(difficulties);
    }
  }, [getTest]);

  const handleImageQuestion = async () => {
    try {
      const images = [...uploadedImages];
      if (images.length <= 3) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Upload all images",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      const newOptions = [...options];

      if (!newOptions.some((option) => option.isCorrect)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select Correct Answer",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (!selectedDifficulty || !questionTitle) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select Difficulty or Enter Question ",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      const formData = new FormData();

      // const payload = {
      //   text: questionTitle,
      //   options: newOptions, // Filter out empty options
      //   subjectId: topicId,
      //   difficultyLevel: selectedDifficulty,
      //   testId: testId,
      //   avatar: images,
      // };
      console.log("images ", images);
      images.forEach((file, index) => {
        formData.append(`avatar[]`, file);
      });
      formData.append("text", JSON.stringify(questionTitle));
      formData.append("options", JSON.stringify(newOptions));
      formData.append("subjectId", JSON.stringify(topicId));
      formData.append("difficultyLevel", JSON.stringify(selectedDifficulty));
      formData.append("testId", JSON.stringify(testId));

      const response = await axios.post(TEST_API + "/createQuestionWithImage", formData, { headers: { ...testHeaders.headers, "Content-Type": "multipart/form-data" } });
      if (response) {
        console.log(response);
        toast.success("Question Created Successfully!");
        document.getElementById("ask-ques-title").value = "";
        setOptions([
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
        setUploadedImages([]);
        setSelectedDifficulty("");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleNext = async () => {
    try {
      const newOptions = [...options];
      // Send data to backend API
      if (!questionWithImage) {
        for (const i in newOptions) {
          if (newOptions[i].text === "") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "option Can not be empty",
              showConfirmButton: false,
              timer: 2000,
            });
            return;
          }
        }
      }
      if (!newOptions.some((option) => option.isCorrect)) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select Correct Answer",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
      if (!selectedDifficulty && !questionTitle) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Select Difficulty or Enter Question ",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      const payload = {
        text: questionTitle,
        options: newOptions, // Filter out empty options
        subjectId: topicId,
        difficultyLevel: selectedDifficulty,
        testId: testId,
      };

      const response = await axios.post(TEST_API + "/createQuestion", payload, testHeaders);
      if (response.status === 201) {
        toast.success("Question Created Successfully!");
        document.getElementById("ask-ques-title").value = "";
        setOptions([
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
        setSelectedDifficulty("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDifficultyChange = (ID) => {
    setSelectedDifficulty(ID);
  };

  const handleCorrectChange = (index) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index ? !option.isCorrect : false, // Toggle the correctness of the selected option
    }));
    setOptions(newOptions);
  };

  const EditCorrectOption = (index, key) => {
    const data = [...questionsData];
    const newData = data.map((question, dataIndex) => {
      if (dataIndex === key) {
        // If the current question index matches the key, update its options
        return {
          ...question,
          options: question.options.map((option, i) => ({
            ...option,
            isCorrect: i === index ? !option.isCorrect : false,
          })),
        };
      }
      return question; // For other questions, return unchanged
    });
    setQuestionData(newData);
  };

  const updateQuestion = async () => {
    const data = [...questionsData];
    try {
      const response = await axios.post(TEST_API + "/updateQuestion", { questionsData: data }, testHeaders);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Question Updated Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleEditDifficultyChange = (diifId, key) => {
    const data = [...questionsData];
    const newData = data.map((question, index) => {
      if (key === index) {
        return {
          ...question,
          difficultyLevel: diifId,
        };
      } else {
        return question; // Return the original question for other indices
      }
    });
    setQuestionData(newData);
  };

  const handleDeleteButton = async (ID) => {
    try {
      const response = await axios.post(TEST_API + "/deleteQeustions", { _id: ID }, testHeaders);
      if (response) {
        toast.success("Question Deleated Successfully!");
        // getAllQuestions();
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const handleChnageQuestionType = (e) => {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "1") {
      setQuestionWithImage(false);
    } else {
      setQuestionWithImage(true);
    }
    document.getElementById("ask-ques-title").value = "";
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setUploadedImages([]);
    setSelectedDifficulty("");
  };

  return (
    <div className="mx-5 flex flex-col" style={{ width: "100%" }}>
      <div className="ask-ques-container">
        <h1>Ask a Question</h1>
        <form className="md:w-[1120px] w-fit ">
          <div className="ask-form-container flex flex-col">
            <label htmlFor="ask-ques-title">
              <h4>Your Question </h4>
              <p>Be specific with question </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <div className="mb-4">
              <label htmlFor="options" className="block mb-2">
                Options
              </label>
              {!questionWithImage ? (
                <>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input type="text" value={option.text} onChange={(e) => handleChangeOption(index, e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500" placeholder={`Option ${index + 1}`} />
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="radio" name="correctAnswer" checked={option.isCorrect} onChange={() => handleCorrectChange(index)} className="form-radio h-5 w-5 text-blue-500" />
                        <span className="ml-2">Correct</span>
                      </label>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div>
                        <input type="file" onChange={(e) => handleImageChange(e, index)} />
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="radio" name="correctAnswer" checked={option.isCorrect} onChange={() => handleCorrectChange(index)} className="form-radio h-5 w-5 text-blue-500" />
                          <span className="ml-2">Correct</span>
                        </label>
                      </div>
                      <br />
                      {uploadedImages[index] && <img src={URL.createObjectURL(uploadedImages[index] ? uploadedImages[index] : "")} alt={`Option ${index + 1}`} style={{ maxWidth: "100px" }} />}
                      <br />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <ul className="flex">
                  {difficulties.map((item, index) => (
                    <li key={index} className="ml-3">
                      <label className="flex gap-1">
                        <input
                          type="radio"
                          name="difficulty"
                          value={item._id}
                          checked={selectedDifficulty === item._id} // Assuming you have a state variable selectedDifficulty to keep track of the selected difficulty
                          onChange={() => handleDifficultyChange(item._id)} // Assuming you have a function handleDifficultyChange to update the selected difficulty
                        />
                        {item.level}
                      </label>
                    </li>
                  ))}
                </ul>
                <select className="p-2 appearance-none border rounded-lg w-full focus:outline-none focus:border-blue-500" onChange={(e) => handleChnageQuestionType(e)}>
                  <option value={1}>Question With Text</option>
                  <option value={2}>Question With Images</option>
                </select>
              </div>
              <button type="button" onClick={!questionWithImage ? handleNext : handleImageQuestion} className=" btn-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        </form>
        {/* {questionsData.length > 0 && (
          <button type="button" onClick={() => handleSeeQuestions()} className=" btn-sm bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            See All Questions
          </button>
        )} */}
      </div>

      {questionsData.map((item, key) => (
        <div className="ask-ques-container rounded-sm">
          <div className="md:w-[1120px] w-fit  ">
            <div key={key} className=" my-2 py-3 px-3 bg-white">
              <div className="items-center">
                <span>
                  {key + 1}
                  {")"}
                </span>
                <input className="ml-3  " value={item.text} placeholder="Enter your question" />
              </div>
              {item.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span> {String.fromCharCode(65 + index)}</span>
                  {option.text.split(".")[1] === "png" || option.text.split(".")[1] === "jpg" || option.text.split(".")[1] === "jpeg" ? (
                    <div className="w-full h-[100px]">
                      <img className="h-[100px] ml-3" height={"100px"} width={"25%"} src={"http://localhost:5000/" + option.text} alt="option" />
                    </div>
                  ) : (
                    <input type="text" value={option.text} onChange={(e) => EditChangeOption(index, key, e.target.value)} className="w-full border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500" placeholder={`Option ${index + 1}`} />
                  )}
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="radio" name={`correctAnswer_${key}`} checked={option.isCorrect} onChange={() => EditCorrectOption(index, key)} className="form-radio h-5 w-5 text-blue-500" />
                    <span className="ml-2">Correct</span>
                  </label>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <ul className="flex">
                  {difficulties.map((diff, index) => (
                    <li key={index} className="ml-3">
                      <label className="flex gap-1">
                        <input
                          type="radio"
                          name={`difficulty_${key}`}
                          defaultChecked={item.difficultyLevel === diff._id}
                          // defaultChecked={item.difficultyLevel === diff._id ? true : false}
                          id={`diff_${item._id}`}
                          onChange={() => handleEditDifficultyChange(diff._id, key)} // Assuming you have a function handleDifficultyChange to update the selected difficulty
                        />
                        {diff.level}
                      </label>
                    </li>
                  ))}
                </ul>
                {item.optionType === "image" && (
                  <button className="text-red-700" onClick={() => handleDeleteButton(item._id)}>
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {questionsData.length > 0 && (
        <div className="flex ask-ques-container justify-between ">
          <div></div>
          <button className="flex-end bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => updateQuestion()}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestions;
