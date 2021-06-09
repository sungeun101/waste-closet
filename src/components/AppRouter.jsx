import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import GlobalStyle, { Container } from '../globalStyles';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Header from './Header';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Container>
            <Header isLoggedIn={isLoggedIn} userObj={userObj} />
            <Home userObj={userObj} />
          </Container>
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route>
          <NotFound />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
