import axios from "axios";
import React, { useEffect, useState } from "react";
import { TEST_API } from "../actions/api";
import Loader from "./Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AllTests() {
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTests();
  }, []);

  const getAllTests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(TEST_API + "/getAllTest"); // Await the axios request
      if (response) {
        setTestData(response.data.Tests);
      }
      setLoading(false);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleEdit = (item) => {
    navigate("/createTest", {
      state: {
        updateProduct: true,
        data: item,
      },
    });
  };

  const deleteQuestion = async (id) => {
    try {
      // setEnableEditQuestion(!enableEditQuestion);
      const response = await axios.delete(TEST_API + `/deleteTest/${id}`);
      if (response) {
        // setQuestions(response.data.questions);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Test Deleted Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        getAllTests();
        return;
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleDelete = async (item) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete the test? All the assigned questions will be unassigned.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      });

      if (result.isConfirmed) {
        // Run deleteQuestion function
        await deleteQuestion(item._id);
        Swal.fire("Deleted!", "The test has been deleted.", "success");
      } else {
        Swal.fire("Cancelled", "The test is safe.", "error");
      }
    } catch (error) {
      console.error("Error deleting the test:", error);
      Swal.fire("Error", "There was an error deleting the test.", "error");
    }
  };

  return (
    <div className="container pt-4">
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-auto p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Test Name/Subjects</th>
                <th className="py-2 px-4 border-b-2 border-gray-300 " style={{ textAlign: "end" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {testData.map((item, key) => (
                <tr key={key} className="bg-gray-100">
                  <td className="py-4 px-6 border-b border-gray-300">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold">{item.testName} </span>
                      {item.subjectIds.map((data, i) => (
                        <span className="text-gray-600">{data.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 text-right">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2" onClick={() => handleDelete(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllTests;
