import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { changeUserStatus } from "../../actions/action";

const Success = () => {
  const seachQuery = useSearchParams()[0];

  const { subscribtionSelected } = useContext(AuthContext);
  const referenceNum = seachQuery.get("reference");
  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = async () => {
    try {
      const res = await changeUserStatus();
      if (res) {
        localStorage.clear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="alert alert-success text-center">
            <h4 className="alert-heading">Payment Successfull</h4>
            Reference No.{referenceNum}
          </div>
          <a href="/">Back To Home </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
