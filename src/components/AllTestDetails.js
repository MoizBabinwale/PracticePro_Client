import React, { useEffect, useState } from "react";
import { testHeaders } from "../actions/testAction";
import { TEST_API } from "../actions/api";
import axios from "axios";

function AllTestDetails() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    getAllTestRes();
  }, []);
  const getAllTestRes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(TEST_API + "/getAllResult", testHeaders);

      if (response) {
        console.log("res", response.data);
        setResult(response.data.results);
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1 className="flex justify-start p-3 ml-3 font-semibold">All Results</h1>
      <table className="table-fixed w-full">
        <thead className="bg-slate-500 text-white">
          <tr>
            <th className="w-1/6 py-2 pl-2">Sr. No.</th>
            <th className="w-1/6 py-2">Total Questions</th>
            <th className="w-1/4 py-2">Date</th>
            <th className="w-1/6 py-2">Score</th>
            <th className="w-1/4 py-2">Percentage</th>
            <th className="w-1/6 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="py-2 pl-2">{index + 1}</td>
              <td className="py-2">{item.totalQuestions}</td>
              <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
              <td className="py-2">{item.score}</td>
              <td className="py-2">{((item.score / item.totalQuestions) * 100).toFixed(2)}%</td>
              <td className="py-2">{item.score >= item.totalQuestions * 0.6 ? "Pass" : "Fail"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTestDetails;
