import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../Components/ListingItem";
import { toast } from "react-toastify";

const Profile = () => {
  // initialize variables
  const auth = getAuth();
  const navigate = useNavigate();

  // Initialize states

  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // Fetch all User Listings
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");

      // Creating a query
      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);

      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() });
      });

      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  //Deleting Functionality

  const onDelete = async (listingId) => {
    if (window.confirm("are you sure you want to delete? ")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("successfully deleted");
    }
  };

  // Edit Functionality
  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const { name, email } = formData;

  // Form Submission

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, { displayName: name });
        // Update name in fireStore
        await updateDoc(doc(db, "users", auth.currentUser.uid), { name });
      }
    } catch (error) {}
  };

  // Onchange Functionality
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <input
            type="text"
            id="name"
            className={!changeDetails ? "profileName" : "profileNameActive"}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            className={!changeDetails ? "profileEmail" : "profileEmailActive"}
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </div>
        <Link to={"/create-listing"} className="createListing">
          <img src={homeIcon} alt="Home Icon" />
          <p>Sell or Rent your Home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingList">
              {listings.map(({ id, data }) => (
                <ListingItem
                  key={id}
                  listing={data}
                  id={id}
                  onDelete={() => onDelete(id)}
                  onEdit={() => onEdit(id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
