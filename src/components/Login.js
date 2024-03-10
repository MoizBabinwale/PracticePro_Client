import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, singUp } from "../actions/action";
import { Rings } from "react-loader-spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [seenPass, setSeenPass] = useState(false);
  const [userName, setName] = useState("");
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
        window.location.reload();
      }, 2500);
    }
    if (signupState.responseData) {
      const response = signupState.responseData;
      if (response.responseData.message === "User created successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Signup successful!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }, [loginState, signupState]);

  const handleSubmit = async () => {
    if (isSignup) {
      dispatch(login(email, password, authContext));
    } else {
      dispatch(singUp(userName, email, password, phone));
    }
  };

  const togglePage = () => {
    setIsSignup(!isSignup);
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100 pt-16 px-3 md:!justify-around md:flex">
        <img className="hidden md:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg" alt="illustration"></img>
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
                <input type="text" className="form-control" placeholder="Enter Number" id="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
            {/* value={email} onChange={(e) => setEmail(e.target.value)}  */}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type={seenPass ? "text" : "password"} className="form-control" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {seenPass ? (
              <AiOutlineEye onClick={() => setSeenPass(!seenPass)} style={{ backgroundColor: "#7d7dad", position: "relative", top: "-30px", left: "92%", borderRadius: "25%", fontSize: "larger" }} />
            ) : (
              <AiOutlineEyeInvisible onClick={() => setSeenPass(!seenPass)} style={{ backgroundColor: "transparent", position: "relative", top: "-30px", left: "92%", borderRadius: "25%", fontSize: "larger" }} />
            )}
          </div>
          <button type="button" className="btn w-full text-white items-center justify-center font-semibold bg-blue-700 hover:bg-blue-800" onClick={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
            {isSignup ? "Login" : "SignUp"}
            {loginState.isLoading && <Rings height="20" width="50" color="white" radius="6" wrapperStyle={{ marginLeft: "10px" }} wrapperclassName="" visible={true} ariaLabel="rings-loading" />}
          </button>
          <div className="w-100" style={{ cursor: "pointer" }}>
            <p onClick={togglePage} className="text-black mt-2">
              {isSignup ? "Don't have an Account?" : "Alredy have an Account!"}
            </p>
          </div>
          {loginState.isLoggedIn && <p style={{ color: "green" }}>Login Successfully!</p>}
          {loginState.isLoading === false && loginState.isLoggedIn === false && <p style={{ color: "red" }}>Login Failed !</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
