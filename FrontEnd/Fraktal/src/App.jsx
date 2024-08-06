import './css/App.css';
import './css/cel.css'; // Asegúrate de importar el archivo CSS
import { Navbar } from './components/Navbar';
import { LoginWeb } from './components/LoginWeb';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';
import { MarketPage } from './pages/MarketPage';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { PaginaPrincipal } from './components/PaginaPrincipal';
import { SignupWeb } from './components/SignupWeb';

function App() {

  return (
    <>         
      <section>
        <Routes>   
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<LoginWeb />} />
          <Route path="/signup" element={<SignupWeb />} />
          <Route path="/market" element={<MarketPage />}>
            <Route path=":tokenId" element={<div />} />
          </Route>
        </Routes>
      </section>
    </>
  );
}

export default App;
