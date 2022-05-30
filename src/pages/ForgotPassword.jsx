import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Sent");
    } catch (error) {
      toast.error("Could not sent reset email");
    }
  };
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="emailInput"
            onChange={onChange}
            value={email}
            placeholder="Email"
          />
          <Link to="/sign-in" className="forgotPasswordLink">
            Sign-In
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ForgotPassword;
