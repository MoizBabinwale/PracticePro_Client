import React, { useEffect, useState } from "react";
import { getAllPaymentStatus } from "../actions/action";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((payment) => (
                <tr key={payment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{payment?.userDetail?.name}</td>
                  <td className="px-6 py-4">{payment.razorpay_payment_id}</td>
                  <td className="px-6 py-4">&#x20b9;{payment.amount}</td>
                  <td className="px-6 py-4">{payment?.userDetail?.subscription?.plan}</td>
                  <td className="px-6 py-4">{new Date(payment?.userDetail?.subscription?.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(payment?.userDetail?.subscription?.planExpiryDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllPayments;
