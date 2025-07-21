import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//User components
import Navbar from './components/user/navbar';
import Home from './pages/user/Home';
import MembershipRegister from './pages/user/MembershipReg';
import Createaccount from './pages/user/CreateAccount';
import Login from './pages/user/Login';
import Footer from './components/user/footer';
import Booking from './pages/user/Booking';




function App() {
  return (
    <BrowserRouter>

      {/*Navbar appears on all the pages */}
      <Navbar/>

      <Routes>
        <Route path= "/" element={<Home/>} />
        <Route path= "/membershipReg" element={<MembershipRegister/>}/>
        <Route path= "/createAccount" element={<Createaccount/>}/>
        <Route path= "/login" element={<Login/>}/>
        <Route path= "/booking" element={<Booking/>}/>
       
      </Routes>
      {/*footer appears on all pages */}
      <Footer/>
    </BrowserRouter>
  
  );
}

export default App;
