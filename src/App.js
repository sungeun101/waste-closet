import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import AppRouter from 'components/AppRouter';
import { authService } from 'service/firebase/firebase';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        const emailStr = user.email;
        const emailChars = emailStr.split(`@`);
        setUserObj({
          uid: user.uid,
          email: user.email,
          displayName:
            user.displayName === null ? emailChars[0] : user.displayName,
          photoURL:
            user.photoURL === null
              ? `https://avatars.dicebear.com/api/jdenticon/${user.uid}.svg`
              : user.photoURL,
        });
        if (user.photoURL === null) {
          try {
            const user = authService.currentUser;
            user.updateProfile({
              photoURL: `https://avatars.dicebear.com/api/jdenticon/${user.uid}.svg`,
            });
          } catch (error) {
            console.log(error);
          }
        }
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
