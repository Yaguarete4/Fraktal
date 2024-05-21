import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Cel } from './Cel';

const App = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleToggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <div>
      <Navbar onToggleMenu={handleToggleMenu} />
      <Cel isMenuVisible={isMenuVisible} />
    </div>
  );
};

export default App;
