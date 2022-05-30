import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

const Oauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      //create user
      if (!docSnap.exist()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("could not authorize with google");
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-in" ? "In" : "Up"} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
};

export default Oauth;
