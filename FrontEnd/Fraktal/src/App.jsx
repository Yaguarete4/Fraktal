// import React, { useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Pag1 } from './components/Pag1';
import { NoLogin } from './components/PagNoLogin';

import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserClick = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      <section>
        <Navbar onUserClick={handleUserClick} />
        <div className="container1">        
          {isLoggedIn ? <Pag1 /> : <NoLogin />}
        </div>
      </section>
    </>
  );
}

export default App;
