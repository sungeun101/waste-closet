import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import AppRouter from 'components/AppRouter';
import { authService } from 'service/firebase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        setUserObj({
          uid: user.uid,
          displayName:
            user.displayName === null ? 'welcome' : userObj.displayName,
          photoURL:
            user.photoURL === null
              ? 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              : user.photoURL,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return init ? (
    <AppRouter
      isLoggedIn={Boolean(userObj)}
      userObj={userObj}
      setUserObj={setUserObj}
    />
  ) : (
    'Initializing...'
  );
}

export default App;
