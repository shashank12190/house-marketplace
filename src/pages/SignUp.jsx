import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { db } from "../firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Oauth from "../Components/Oauth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("something went wrong with registration");
      console.log(error);
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
          className="nameInput"
          id="name"
          placeholder="Name"
          value={name}
          onChange={onChange}
        />
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
        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton" type="submit">
            <ArrowRightIcon fill="ffffff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      <Link to="/sign-in" className="registerLink" style={{ marginTop: "5px" }}>
        Sign-In Instead
      </Link>
      {/* <Oauth /> */}
    </div>
  );
};

export default SignUp;
