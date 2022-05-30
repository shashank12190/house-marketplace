import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";

import ListingItem from "../Components/ListingItem";

const Category = () => {
  // Initialize states

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListings, setLastFetchedListings] = useState(null);

  // Initializing variables

  const params = useParams();

  // Fetching all Listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get Reference
        const listingsRef = collection(db, "listings");
        // create query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        // execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListings(lastVisible);
        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch listings");
      }
    };
    fetchListings();
  }, [params.categoryName]);

  //pagination load more

  const onFetchMoreListings = async () => {
    try {
      //get Reference
      const listingsRef = collection(db, "listings");

      // create query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(1),
        startAfter(lastFetchedListings)
      );

      // execute query
      const querySnap = await getDocs(q);
      const listings = [];
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListings(lastVisible);
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("could not fetch listings");
    }
  };
  return (
    <>
      <div className="category">
        <header>
          <p className="pageHeader">
            {params.categoryName === "rent"
              ? "Places for Rent"
              : "Places for Sale"}
          </p>
        </header>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </main>
            <br />
            <br />
            {lastFetchedListings && (
              <p className="loadMore" onClick={onFetchMoreListings}>
                Load More
              </p>
            )}
          </>
        ) : (
          <p>No listings for {params.categoryName}</p>
        )}
      </div>
    </>
  );
};

export default Category;
