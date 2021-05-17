import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import GlobalStyle, { Container } from '../globalStyles';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import QnA from '../pages/QnA';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
  const [adminLogin, setAdminLogin] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <Container>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact>
              <Navigation setAdminLogin={setAdminLogin} />
              <Home />
            </Route>
            <Route path="/qna">
              <Navigation setAdminLogin={setAdminLogin} />
              <QnA adminLogin={adminLogin} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Auth setAdminLogin={setAdminLogin} />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </Container>
    </Router>
  );
};

export default AppRouter;
