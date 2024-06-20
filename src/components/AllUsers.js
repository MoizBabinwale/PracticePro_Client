import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { getAllUsers } from "../actions/action";
import { useNavigate } from "react-router-dom";

function AllUsers() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("Profile"));
    if (isLoggedIn && isLoggedIn?.data?.isAdmin) {
      window.scrollTo(0, 0);
      const fetchdata = async () => {
        setLoading(true);
        const res = await getAllUsers();
        if (res) {
          console.log("res ", res);
          setUserData(res.user);
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
        <div className=" mx-auto p-4">
          {userData.length > 0 && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300">User Name</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Phone Number</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Admin</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Subscription</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, key) => (
                  <tr key={key} className="bg-gray-100">
                    <td className="py-4 px-6 border-b border-gray-300">{item.name} </td>
                    <td className="py-4 px-6 border-b border-gray-300">{item.phone} </td>
                    <td className="py-4 px-6 border-b border-gray-300">{item.userEmail} </td>
                    <td className="py-4 px-6 border-b border-gray-300">{item.isAdmin ? "Yes" : "No"}</td>
                    <td className="py-4 px-6 border-b border-gray-300">{item.subscription?.isSubscribed} </td>
                    <td className="py-4 px-6 border-b border-gray-300">{item.joinedDate} </td>
                    {/* <td className="py-4 px-6 border-b border-gray-300">{item.name}                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AllUsers;
