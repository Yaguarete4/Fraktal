// import React, { useEffect } from 'react';
import './css/App.css';
import { Navbar } from './components/Navbar';
import { Pag1 } from './components/Pag1';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';


import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserClick = () => {
    setIsLoggedIn(true);

  const [isLoggedIn1, setIsLoggedIn1] = useState(false);

  const handleUserClick1 = () => {
    setIsLoggedIn1(true);
  };
  
  return (
    <>
      <section>
        <Navbar onUserClick={handleUserClick} />
        <div className="container1">        
          {isLoggedIn ? <Wallet /> : <Login />}
        </div>
        <div className="cel">
          <Cel/>
        </div>
      </section>
    </>
  );
}

export default App;
