import './css/App.css';
import { Navbar } from './components/Navbar';
import { Pag1 } from './components/Pag1';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>         
    <section>     
      <Navbar/>
          <Routes>   
                <Route path="/" element={<Pag1 />} />
                <Route path="/wallet" element={<Link to="/login">Hola</Link>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Pag1 />} />

        </Routes>
    </section>
      {/* <section>
        <Navbar onPageChange={handlePageChange} />
        <div className="container1">
          {currentPage === 'wallet' && <Wallet />}
          {currentPage === 'home' && <Pag1 />}
          {currentPage === 'user' && <Login />}
        </div>
        <div className="cel">
          <Cel />
        </div>
      </section> */}
    </>
  );
}

export default App;
