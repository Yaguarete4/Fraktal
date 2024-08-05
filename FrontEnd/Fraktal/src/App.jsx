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
<<<<<<< HEAD
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Pag1 />} />
                <Route path="/global" element={<GlobalPage />} />
=======
                <Route path="/login" element={<LoginWeb />} />
                <Route path="/signup" element={<SignupWeb />} />
                <Route path="/cel" element={<Cel />} />

>>>>>>> ebc7292a9b79bab954f214bc1097f6c38b7b6ee1
        </Routes>
    </section>
    </>
  );
}

export default App;
