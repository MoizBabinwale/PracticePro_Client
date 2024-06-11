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
        <input type="password" id="newPassword" class="swal2-input" placeholder="New Password">
        <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm Password">
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
    console.log("e.keycode ", e.keyCode);
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100 pt-16 px-3 md:!justify-around md:flex">
        <img className="hidden md:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" alt="illustration"></img>
        {!verfiyEmail ? (
          <div className="w-96 md:!w-[600px]  p-4 rounded border shadow-md ">
            <h2 className="text-center mb-4" style={{ color: "black" }}>
              {isSignup ? "Login" : "Signup"}
            </h2>

            {!isSignup && (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" placeholder="Enter Name" id="Name" value={userName} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phhone" className="form-label">
                    Phone Number
                  </label>
                  <input type="number" className="form-control" placeholder="Enter Number" id="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={seenPass ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onKeyDown={(e) => handleEnter(e)}
                onChange={(e) => setPassword(e.target.value)}
              />
              {seenPass ? (
                <AiOutlineEye onClick={() => setSeenPass(!seenPass)} style={{ backgroundColor: "#7d7dad", position: "relative", top: "-30px", left: "92%", borderRadius: "25%", fontSize: "larger" }} />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setSeenPass(!seenPass)}
                  style={{ backgroundColor: "transparent", position: "relative", top: "-30px", left: "92%", borderRadius: "25%", fontSize: "larger" }}
                />
              )}
            </div>
            <button
              type="button"
              disabled={isLoading}
              className="btn w-full text-white items-center justify-center font-semibold bg-blue-700 hover:bg-blue-800"
              onClick={() => handleSubmit()}
              style={{ display: "flex", alignItems: "center" }}
            >
              {isSignup ? "Login" : "SignUp"}
              {loginState.isLoading && <Rings height="20" width="50" color="white" radius="6" wrapperStyle={{ marginLeft: "10px" }} wrapperclassName="" visible={true} ariaLabel="rings-loading" />}
              {isLoading && <Loader />}
            </button>
            <div className="w-100 flex justify-between" style={{ cursor: "pointer" }}>
              <p onClick={togglePage} className="text-black mt-2 ">
                {isSignup ? "Don't have an Account?" : "Alredy have an Account!"}
              </p>
              {isSignup && (
                <span onClick={toggleForgotPassword} className="mt-2 text-blue-500">
                  Forgot Password?
                </span>
              )}
            </div>
            {loginState.isLoggedIn && <p style={{ color: "green" }}>Login Successfully!</p>}
            {loginState.isLoading === false && loginState.isLoggedIn === false && <p style={{ color: "red" }}>Login Failed !</p>}
          </div>
        ) : (
          <div className="flex flex-col w-96">
            <>
              <h2>OTP Verification</h2>
              <span className="text-red-600 ">*Please do Not Reload the Page!</span>
              <input className="mt-3  border-none p-2" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} maxLength={6} />
              <button className="p-2 mt-3 bg-blue-500 hover:bg-blue-800 text-white justify-center " onClick={handleVerify} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </button>
            </>

            {/* {verificationResult && <p>{verificationResult}</p>} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
