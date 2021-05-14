import React, { useState } from 'react';
import 'antd/dist/antd.css';
import AppRouter from 'components/AppRouter';

function App() {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...';
}

export default App;
