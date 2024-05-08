import React, { useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar.jsx';
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState();

  const changeDarkMode = () => {
    setDarkMode(prev => !prev);
  }

  useEffect(() => {
    if (darkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [darkMode])

  // useEffect(() => {
  //   const darkModeToggle = document.getElementById('darkModeToggle');
  //   const body = document.body;
  //   const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
  //   if (darkModeToggle) {
  //     if (isDarkMode) {
  //       body.classList.add('dark-mode');
  //       darkModeToggle.checked = true;
  //     }
  //     darkModeToggle.addEventListener('change', () => {
  //       if (darkModeToggle.checked) {
  //         body.classList.add('dark-mode');
  //         localStorage.setItem('darkMode', 'enabled');
  //       } else {
  //         body.classList.remove('dark-mode');
  //         localStorage.setItem('darkMode', 'disabled');
  //       }
  //     });
  //   }
  // }, []); // Empty dependency array ensures that this effect runs only once after initial render

  return (
    <>
      <section>
        <header className="container">
            <div className="page-header">
                <img src="./components/sexoso.svg" className="logo"></img>
                <input type="checkbox" id="click"/>
    
                <label htmlFor="click" className="mainicon">
                    <div className="menu">
                        <i className='bx bx-menu'></i>
                    </div>
                </label>
                <ul>
                    <li><a href="#" className="active" style={{ '--navAni': 1 }}>Market</a></li>
                    <li><a href="#" style={{ '--navAni': 2 }}>Wallet</a></li>
                    <li><a href="#" style={{ '--navAni': 3 }}>Convert</a></li>
                    <li><a href="#" style={{ '--navAni': 4 }}>Contact</a></li>
                    <li><a href="#" style={{ '--navAni': 5 }}>Global</a></li>
                </ul>
                <label className="mode">
                    <button onClick={changeDarkMode} type="checkbox" id="darkModeToggle"/>
                    <i className='bx bxs-moon'></i>
                </label>
            </div>
        </header>
    
        <div className="container">
            {/* <div className="main">
                <div className="detail">
                    <h3>Hi, I'm</h3>
                    <h1><span style={{ color: '#52489C' }}>John</span> Doe</h1> 
                    <p>I'm a professional Web Developer. Our Main Goal to help & Satisficed the Local & Global Clients by
                        web development solutions
                    </p>  

                </div>
            </div> */}
        </div>
    </section>
    </>
  );
}

export default App;
