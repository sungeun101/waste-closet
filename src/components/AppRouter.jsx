import React from 'react';
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

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <GlobalStyle />
      {isLoggedIn ? (
        <Container>
          <Switch>
            <Route path="/" exact>
              <Navigation userObj={userObj} />
              <Home />
            </Route>
            <Route path="/qna">
              <Navigation userObj={userObj} />
              <QnA userObj={userObj} />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Container>
      ) : (
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
