import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const Contact = () => {
  // initializing state

  const [message, setMessage] = useState("");
  const [landLord, setLandLord] = useState(null);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();

  // fetching landlord using landlordId
  useEffect(() => {
    const getLandLord = async () => {
      const docRef = doc(db, "users", params.landLordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        console.log(docSnap.data());
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get the landlord");
      }
    };
    getLandLord();
  }, [params.landLordId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {landLord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landLord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                className="textarea"
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${landLord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default Contact;
