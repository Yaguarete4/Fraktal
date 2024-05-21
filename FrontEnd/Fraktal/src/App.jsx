// import React, { useEffect } from 'react';
import './css/App.css';
import { Navbar } from './components/Navbar';
import { Pag1 } from './components/Pag1';
import { NoLogin } from './components/PagNoLogin';
import { Cel } from './components/Cel';

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
        <div className="cel">
          <Cel/>
        </div>
      </section>
    </>
  );
}

export default App;
