import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import AppRouter from 'components/AppRouter';
import { authService } from 'service/firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...';
}

export default App;
