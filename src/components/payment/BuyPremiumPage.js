import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../actions/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Loader from "../Loader";
import Swal from "sweetalert2";
import logo from "../../assets/Practisepro.png";

function BuyPremiumPage() {
  const [token, setToken] = useState("");
  const [form, setForm] = useState({ amount: "", name: "", email: "", phone: "", subscribefor: "", id: "" });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { isPremiumUser, setSubscriptionSelected } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem("Profile"));
    if (!userData) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please login to Buy Premium!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
      return;
    } else if (!isPremiumUser) {
      const userInfo = userData.data;
      var formData = {
        amount: "",
        name: userInfo.name,
        email: userInfo.userEmail,
        phone: userInfo.phone,
        userToken: userData.token,
        subscribefor: "",
        id: userInfo._id,
      };
      setForm(formData);
    } else {
      navigate("/");
    }
  }, []);

  const getToken = async (e) => {
    e.preventDefault();

    const subscribefor = e.target.dataset.pack;
    const amount = e.target.dataset.amount;

    // const response = await axios.post(API + "/get-token");
    // const token = response.data;
    setForm((prevForm) => ({
      ...prevForm,
      amount: amount,
      subscribefor: subscribefor,
    }));
    localStorage.setItem("subscriptionFor", subscribefor);
    setSubscriptionSelected(subscribefor);
    checkoutHandler(amount, form?.name, form?.id);
    // setLoading(false);
    // } catch (error) {
    //   console.log("error ", error);
    //   setLoading(false);
    // }
  };

  const checkoutHandler = async (amount, userName, userId) => {
    const {
      data: { key },
    } = await axios.get(API + "/getkey");

    const {
      data: { order },
    } = await axios.post(API + "/checkout", {
      amount,
      userName,
      userId,
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "PRACTISE PRO",
      description: "Tutorial of RazorPay",
      image: logo,
      order_id: order.id,
      // callback_url: API + "/paymentverification",
      handler: async function (response) {
        const body = {
          ...response,
        };
        if (body) {
          try {
            const validateRes = await axios.post(API + "/payment/paymentverification", body, {
              headers: {
                "Content-Type": "application/json",
              },
            });

            const jsonRes = validateRes.data;
            if (jsonRes) {
              window.location.href = jsonRes.redirectUrl;
            }
          } catch (error) {
            console.error("Error making API request:", error?.response);
          }
        }
      },
      prefill: {
        name: form?.name,
        email: form?.email,
        contact: form?.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#4a98f7",
      },
    };
    const razor = await new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    razor.open();
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
              <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
              </p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best option for personal use & for your next project.</p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">&#x20b9;149</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Team size: <span className="font-semibold">1 developer</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Premium support: <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Free updates: <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                </ul>
                <div className="justify-center mt-8 flex">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    data-pack="basic"
                    data-amount="1"
                    onClick={(e) => getToken(e)}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Relevant for multiple users, extended & premium support.</p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">&#x20b9;549</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Team size: <span className="font-semibold">10 developers</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Premium support: <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Free updates: <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                </ul>
                <div className="justify-center mt-8 flex">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    data-pack="medium"
                    data-amount="549"
                    onClick={(e) => getToken(e)}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Enterprise</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">&#x20b9;1099</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Team size: <span className="font-semibold">100+ developers</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Premium support: <span className="font-semibold">36 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>
                      Free updates: <span className="font-semibold">36 months</span>
                    </span>
                  </li>
                </ul>
                <div className="justify-center mt-8 flex">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    data-pack="pro"
                    data-amount="1099"
                    onClick={(e) => getToken(e)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default BuyPremiumPage;
