import React from 'react';
import Navbar from './components/Navbar';
import checkAuth from './components/auth/checkAuth';

function App() {
  return(
  <div>
    <Navbar></Navbar>
    <div className="row d-flex justify-content-center mt-10">
      <h2>WELCOME!!</h2>
    </div>
  </div>
);
}

export default checkAuth(App);