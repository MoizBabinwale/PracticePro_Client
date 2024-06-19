import React, { useEffect, useState } from "react";
import { getAllPaymentStatus } from "../actions/action";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AllPayments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("Profile"));
    if (isLoggedIn && isLoggedIn?.data?.isAdmin) {
      window.scrollTo(0, 0);
      const fetchdata = async () => {
        setLoading(true);
        const res = await getAllPaymentStatus();
        if (res) {
          setData(res.data);
          setLoading(false);
        }
      };
      fetchdata();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="container pt-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="table-responsive ">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Plan</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment?.userDetail?.name}</td>
                    <td>{payment.razorpay_payment_id}</td>
                    <td>{payment.amount}</td>
                    <td>{payment?.userDetail?.subscription?.plan}</td>
                    <td>{new Date(payment?.userDetail?.subscription?.startDate).toLocaleDateString()}</td>
                    <td>{new Date(payment?.userDetail?.subscription?.planExpiryDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllPayments;
