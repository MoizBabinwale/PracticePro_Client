import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../actions/api";

const Failure = () => {
  const navigate = useNavigate();
  useEffect(() => {
    resetUserData();
  }, []);

  const resetUserData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get("userData");
    const userData = JSON.parse(userDataString);
    console.log("iser", userData);
    try {
      const response = await axios.post(
        API + "/resetUserData",
        { userEmail: userData.userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        console.log("cancel", response);
      }
    } catch (error) {
      console.log("error ", error);
    }
    // localStorage.removeItem("Profile");
    // localStorage.setItem("Profile", JSON.stringify(userData));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-danger text-center">
            <h4 className="alert-heading">Oops, something went wrong!</h4>
          </div>
          <a href="/">Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default Failure;
