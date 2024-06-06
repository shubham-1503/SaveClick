import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (password && email) {
      try {
        const response = await axios.post(
          "https://xxxxx.execute-api.us-east-1.amazonaws.com/dev/login",
          { email, password }
        );
        console.log(response);
        if (response.data.statusCode === 200) {
          navigate("/home");
        } else if (response.data.statusCode === 400) {
          setErrorMessage("Wrong email or password. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Error", error.message);
        }
      }
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center">
        <NavBar />
        <p className="text-3xl mb-7 mt-20 font-bold">Login</p>
        <div className="items-center w-[448px] flex-col border-2 p-5 rounded-xl">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="pt-5 w-5/6">
              <div className="flex flex-col justify-center items-center">
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                  className={`w-full px-3 mb-1 py-2 border-2 text-black ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-blue`}
                />
                {emailError && (
                  <span className="text-red-500 mb-1 text-sm">
                    {emailError}
                  </span>
                )}

                <input
                  type="text"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  className={`w-full px-3 mb-1 py-2 border-2 text-black ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-blue`}
                />
                {passwordError && (
                  <span className="text-red-500 mb-1 text-sm">
                    {passwordError}
                  </span>
                )}

                <button
                  type="submit"
                  className="bg-blue flex justify-center text-lg font-semibold items-center w-full mt-2 p-2 rounded-md "
                >
                  Submit
                </button>

                {errorMessage && (
                  <span className="text-red-500 mt-3 text-sm">
                    {errorMessage}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate("/register")}
                className="font-semibold mt-4 flex justify-center items-center w-full"
              >
                Don't have an account? Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
