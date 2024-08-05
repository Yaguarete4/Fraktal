import './css/App.css';
import { Navbar } from './components/Navbar';
import { LoginWeb } from './components/LoginWeb';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';
import { GlobalPage } from './pages/GlobalPage';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { PaginaPrincipal } from './components/PaginaPrincipal';
import { SignupWeb } from './components/SignupWeb';

function App() {
  return (
    <>         
    <section>    
        <Navbar />

          <Routes>   
                <Route path="/" element={<PaginaPrincipal />} />
                <Route path="/wallet" element={<Link to="/login">Hola</Link>} />
                <Route path="/login" element={<LoginWeb />} />
                <Route path="/signup" element={<SignupWeb />} />
                <Route path="/cel" element={<Cel />} />
                <Route path="/global" element={<GlobalPage />} />
        </Routes>
    </section>
    </>
  );
}

export default App;
