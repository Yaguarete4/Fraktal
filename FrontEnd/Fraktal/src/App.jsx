import './css/App.css';
import './css/cel.css'; // Asegúrate de importar el archivo CSS
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
  const [isCelVisible, setIsCelVisible] = useState(false);

  const handleMenuToggle = () => {
    setIsCelVisible(!isCelVisible);
  };

  return (
    <>         
      <section>
        <Navbar onMenuToggle={handleMenuToggle} />
        {isCelVisible && <Cel className="cel-enter" />}
        <Routes>   
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/wallet" element={<Link to="/login">Hola</Link>} />
          <Route path="/login" element={<LoginWeb />} />
          <Route path="/signup" element={<SignupWeb />} />
          <Route path="/global" element={<GlobalPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
