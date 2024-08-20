import './css/App.css';
import './css/cel.css'; 
import { Navbar } from './components/Navbar';
import { LoginWeb } from './components/LoginWeb';
import { Login } from './components/Login';
import { Cel } from './components/Cel';
import { Wallet } from './components/Wallet';
import { MarketPage } from './pages/MarketPage';
import { TokenRegisterPage } from './pages/TokenRegisterPage';
import { Routes, Route } from 'react-router-dom';
import { PaginaPrincipal } from './components/PaginaPrincipal';
import { SignupWeb } from './components/SignupWeb';
import { AuthProvider } from './components/AuthContext';  // Importa el AuthProvider

function App() {
  return (
    <AuthProvider>  {/* Envuelve la aplicación con AuthProvider */}
      <section>
        <Routes>   
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<LoginWeb />} />
          <Route path="/signup" element={<SignupWeb />} />
          <Route path="/market" element={<MarketPage />}>
            <Route path=":tokenId" element={<div />} />
          </Route>
          <Route path="/token-register" element={<TokenRegisterPage />} />
        </Routes>
      </section>
    </AuthProvider>
  );
}

export default App;
