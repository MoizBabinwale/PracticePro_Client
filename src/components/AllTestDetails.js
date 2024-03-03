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
      <h1>All Results</h1>
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Total Questions</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.totalQuestions}</td>
              <td>{item.date}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTestDetails;
