import React, { useContext, useEffect, useState } from "react";
import { testHeaders } from "../actions/testAction";
import { TEST_API } from "../actions/api";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function AllTestDetails() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("Profile"));
    if (isLoggedIn) {
      getAllTestRes();
    } else {
      navigate("/login");
    }
  }, []);

  const getAllTestRes = async () => {
    try {
      setLoading(true);
      // const profile = JSON.parse(localStorage.getItem("Profile"));
      // const  user =profile.data
      // const payload = {
      //   userId : user._id
      // }
      const response = await axios.get(TEST_API + "/getAllResult", testHeaders);

      if (response) {
        setResult(response.data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };
  return (
    <div className="container pt-4" style={{ maxWidth: "95%" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap gap-3  items-center">
            <h1 className="flex justify-start p-3 ml-3 font-semibold">All Results</h1>
            <div className="border-2 rounded-full bg-green-200 w-5 h-5"></div>
            <span>Good</span>
            {/* <div className="border rounded-full bg-blue-600 w-5 h-5"></div>
            <span>Average</span>&nbsp;&nbsp; */}
            <div className="border rounded-full bg-red-200 w-5 h-5"></div>
            <span>Poor Grade/Average</span>
          </div>
          {result.length > 0 ? (
            <table className="table-fixed w-full text-sm md:text-lg">
              <thead className="bg-slate-500 text-white">
                <tr>
                  <th className="w-[65px] py-2 pl-2">Sr. No.</th>
                  <th className="w-1/6 py-2">Subject Name</th>
                  <th className="w-1/6 py-2">Total Questions</th>
                  <th className="w-1/4 py-2">Date</th>
                  <th className="w-1/6 py-2">Score</th>
                  <th className="w-1/4 py-2">Percentage</th>
                  <th className="w-1/6 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => (
                  <tr key={index} className={item.score >= item.totalQuestions * 0.6 ? "bg-green-200" : "bg-red-200"}>
                    <td className="py-2 pl-2">{index + 1}</td>
                    <td className="py-2">{item?.subjectId?.name ? item?.subjectId?.name : "-"}</td>
                    <td className="py-2">{item.totalQuestions}</td>
                    <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="py-2">{item.score}</td>
                    <td className="py-2">{((item.score / item.totalQuestions) * 100).toFixed(2)}%</td>
                    <td className="py-2">{item.score >= item.totalQuestions * 0.6 ? "Pass" : "Fail"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-yellow-200 w-full p-3">
              <p className="text-yellow-600 ">No tests have been taken yet!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllTestDetails;
