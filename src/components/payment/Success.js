import React, { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get("userData");
    const userData = JSON.parse(userDataString);
    const profile = JSON.parse(localStorage.getItem("Profile"));
    profile.data = userData;
    localStorage.setItem("Profile", JSON.stringify(profile));
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-success text-center">
            <h4 className="alert-heading">Payment Successfull</h4>
          </div>
          <a href="/">Back To Home </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
