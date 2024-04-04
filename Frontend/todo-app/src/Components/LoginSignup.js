import React, { useRef, useState } from "react";
import LoginImage from "../Images/LoginImage.png";
import EmailValidation from "../Validations/EmailValidation";
import PasswordValidation from "../Validations/PasswordValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import errorLogo from "../SVG/ErrorLogo.svg";

const LoginSignup = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const emailValid = EmailValidation(email.current.value);
    const passwordValid = PasswordValidation(password.current.value);
    if (emailValid && passwordValid) {
      setemailError("");
      setpasswordError("");
      if (!isSignin) {
        try {
          await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          setSignupError(null);
          navigate("/todo");
          await updateProfile(auth.currentUser, {
            displayName: name.current.value,
          });
        } catch (error) {
          setSignupError(error.code);
        }
      } else {
        try {
          await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          setSigninError(null);
          navigate("/todo");
        } catch (error) {
          setSigninError(error.code);
        }
      }
    }
    if (!emailValid) setemailError("Invalid Email Id");
    if (!passwordValid) setpasswordError("Please enter a valid Password");
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-[50%]"
          style={{ backgroundImage: `url(${LoginImage})` }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">TaskBuster</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Take charge of your tasks. Prioritize, conquer, and feel the
                thrill of accomplishment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                TaskBuster
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                {isSignin
                  ? "Sign in to access your account"
                  : "New to TaskBuster? Create an Account"}
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={(e) => e.preventDefault()}>
                {!isSignin && signupError !== null && (
                  <div className="flex items-center justify-between w-10/12 px-4 py-4 mt-2 mb-4 bg-[#d89d31] mx-4">
                    <img src={errorLogo} alt="LogoError" className="mr-4"></img>
                    {signupError === "auth/email-already-in-use" ? (
                      <p className="text-lg">
                        You are already registered. Sign in or reset your
                        password
                      </p>
                    ) : (
                      <p className="text-lg">
                        There is some error signing up. Please try again
                      </p>
                    )}
                  </div>
                )}
                {isSignin && signinError !== null && (
                  <div className="flex items-center justify-between w-10/12 px-4 py-4 mt-2 mb-4 bg-[#d89d31] mx-4">
                    <img src={errorLogo} alt="LogoError" className="mr-4"></img>
                    <p className="text-lg">
                      Email or Password mismatch. Please try again or create a
                      new account
                    </p>
                  </div>
                )}
                {!isSignin && (
                  <div className="mb-4">
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Name
                    </label>
                    <input
                      ref={name}
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Enter your name"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    ref={email}
                    type="text"
                    name="email"
                    id="email"
                    required
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {emailError.length !== 0 && (
                    <span className="text-base text-orange-500 mx-4">
                      {emailError}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    {isSignin && (
                      <span className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline cursor-pointer">
                        Forgot password?
                      </span>
                    )}
                  </div>

                  <input
                    ref={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    autoComplete="off"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {passwordError.length !== 0 && (
                    <span className="text-base text-orange-500 my-1 mx-4">
                      {passwordError}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transhtmlForm bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none
                   focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={handleButtonClick}
                  >
                    {isSignin ? "Sign in" : "Sign up"}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                {isSignin
                  ? "Don't have an account yet? "
                  : "Already a registered user? "}
                <span
                  className="text-blue-500 focus:outline-none focus:underline hover:underline cursor-pointer"
                  onClick={() => setIsSignin((prev) => !prev)}
                >
                  {isSignin ? "Sign up" : "Sign in"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
