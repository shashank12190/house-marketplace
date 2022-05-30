import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './Components/PrivateRoute';
import Category from './pages/Category';
import CreateListings from './pages/CreateListings';
import React from 'react';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';


function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/create-listing' element={<CreateListings />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path='/contact/:landLordId' element={<Contact />}></Route>
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
