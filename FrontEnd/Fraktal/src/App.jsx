import './css/App.css';
import { Navbar } from './components/Navbar';
import { Pag1 } from './components/Pag1';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';

import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section>
        <Navbar onPageChange={handlePageChange} />
        <div className="container1">
          {currentPage === 'wallet' && <Wallet />}
          {currentPage === 'home' && <Pag1 />}
          {currentPage === 'user' && <Login />}
          {/* Añade más condiciones para otras páginas según sea necesario */}
        </div>
        <div className="cel">
          <Cel />
        </div>
      </section>
    </>
  );
}

export default App;
