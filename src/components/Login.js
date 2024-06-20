import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, singUp, getUserExists, changePassword } from "../actions/action";
import { Rings } from "react-loader-spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";
import { API } from "../actions/api";
import axios from "axios";
import Loader from "./Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verfiyEmail, setVerfiyEmail] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [seenPass, setSeenPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setName] = useState("");
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const loginState = useSelector((state) => state.login);
  const signupState = useSelector((state) => state.signup);

  useEffect(() => {
    var profile = JSON.parse(localStorage.getItem("Profile"));
    if (loginState.isLoggedIn || profile) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/");
        // window.location.reload();
      }, 2500);
    }
    if (signupState.responseData) {
      const response = signupState.responseData;
      if (response.responseData.message === "Email Sent successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Email Sent Please Verify Your Email!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          setIsLoading(false);
          setVerfiyEmail(true);
        }, 2000);
      } else if (response.responseData.response.data.message === "User Alredy Exist") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "User Alredy Exist",
          showConfirmButton: false,
          timer: 2000,
        });
        setIsLoading(false);
        return;
      }
    }
  }, [loginState, signupState]);

  useEffect(() => {
    if (loginState.isLoginFail) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Fails!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  }, [loginState]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    // e.preventDefault();
    if (isSignup) {
      dispatch(login(email, password, authContext));
    } else {
      setIsLoading(true);
      if (phone.length === 10 && emailRegex.test(email)) {
        dispatch(singUp(userName, email, password, phone));
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Enter Correct Phone or Email!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const togglePage = () => {
    setIsSignup(!isSignup);
  };
  const toggleForgotPassword = async () => {
    if (!email) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please Enter Email!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setIsLoading(true);
    const checkUserExist = await getUserExists(email);
    if (checkUserExist.data.message === "OTP sent successfully") {
      setVerfiyEmail(true);
      setIsForgotPassword(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${checkUserExist.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setIsLoading(false);
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(API + "/verify-otp", { userEmail: email, otp });
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "OTP verified successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        if (!isForgotPassword) {
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        } else {
          promptNewPassword(email);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Verification Fails!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const promptNewPassword = (email) => {
    Swal.fire({
      title: "Enter New Password",
      html: `
        <input type="password" id="newPassword" className="swal2-input" placeholder="New Password">
        <input type="password" id="confirmPassword" className="swal2-input" placeholder="Confirm Password">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const newPassword = Swal.getPopup().querySelector("#newPassword").value;
        const confirmPassword = Swal.getPopup().querySelector("#confirmPassword").value;
        if (!newPassword || !confirmPassword) {
          Swal.showValidationMessage("Please enter both password fields");
          return false;
        }
        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage("Passwords do not match");
          return false;
        }
        return { newPassword };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { newPassword } = result.value;
        const res = await changePassword(email, newPassword);
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password changed successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to change password",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    });
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  return (
    <div className="container">
      <div className="flex items-center justify-around h-screen p-4">
        <img className="hidden md:block h-100" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" alt="illustration"></img>
        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-4 text-black">{!verfiyEmail ? <>{isSignup ? "Login" : "Signup"}</> : <>OTP Verification</>}</h2>
          {!isSignup && (
            <>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Name"
                  id="Name"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phhone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Enter Number"
                  id="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="relative">
              <input
                type={seenPass ? "text" : "password"}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter Password"
                value={password}
                onKeyDown={(e) => handleEnter(e)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute top-0 right-0 mt-3 mr-3" onClick={() => setSeenPass(!seenPass)}>
                {seenPass ? (
                  <AiOutlineEye style={{ backgroundColor: "#7d7dad", top: "-30px", right: "0", borderRadius: "25%", fontSize: "larger" }} />
                ) : (
                  <AiOutlineEyeInvisible style={{ backgroundColor: "transparent", top: "-30px", right: "0", borderRadius: "25%", fontSize: "larger" }} />
                )}
              </button>
            </div>
          </div>
          <button
            className="w-full text-white  hover:bg-blue-800 bg-blue-700 font-bold py-2 px-4 rounded justify-center"
            type="button"
            disabled={isLoading}
            onClick={() => handleSubmit()}
            style={{ display: "flex", alignItems: "center", background: "#5c5cff" }}
          >
            {!verfiyEmail ? <>{isSignup ? "Login" : "SignUp"}</> : <>Verify</>}
            {loginState.isLoading && <Rings height="20" width="50" color="white" radius="6" wrapperStyle={{ marginLeft: "10px" }} wrapperclassName="" visible={true} ariaLabel="rings-loading" />}
            {isLoading && <Loader />}
          </button>
          <div className="flex justify-between">
            <p className="text-black mt-2 cursor-pointer" onClick={togglePage}>
              {!verfiyEmail ? <>{isSignup ? "Don't have an Account?" : "Alredy have an Account!"}</> : <>Resend OTP</>}
            </p>
            {isSignup && (
              <span className="mt-2 text-blue-500 cursor-pointer" onClick={toggleForgotPassword}>
                Forgot Password?
              </span>
            )}
          </div>
          {loginState.isLoggedIn && <p className="text-green-600">Login Successfully!</p>}
          {loginState.isLoading === false && loginState.isLoggedIn === false && <p className="text-red-600">Login Failed!</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
