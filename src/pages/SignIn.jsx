import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Oauth from "../Components/Oauth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome back!</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="emailInput"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="passwordInput"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="show Password"
            className="showPassword"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      <Link to="/sign-up" className="registerLink" style={{ marginTop: "5px" }}>
        Sign Up Instead
      </Link>
      {/* <Oauth /> */}
    </div>
  );
};

export default SignIn;
