import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (event) => {
    console.log("button clicked");
    event.preventDefault();
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!username) {
      setUsernameError("Username is required");
    }
    if (!email) {
      setEmailError("Email is required");
    }
    if (password && username && email) {
      try {
        const response = await axios.post(
          "https://vkixlx1as3.execute-api.us-east-1.amazonaws.com/dev/register",
          { email, username, password }
        );
        console.log(response);
        if (response.data.statusCode === 200) {
          navigate("/home");
        } else if (response.data.statusCode === 400) {
          setErrorMessage("This email already exists, try logging in with the same email");
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
        <p className="text-3xl mb-7 mt-20 font-bold">Register</p>
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
                  id="username"
                  value={username}
                  placeholder="Username"
                  onChange={handleUsernameChange}
                  className={`w-full px-3 mb-1 py-2 border-2 text-black ${
                    usernameError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:border-blue`}
                />
                {usernameError && (
                  <span className="text-red-500 mb-1 text-sm">
                    {usernameError}
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
                onClick={() => navigate("/")}
                className="font-semibold mt-4 flex justify-center items-center w-full"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
