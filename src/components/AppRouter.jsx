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

const AppRouter = ({ isLoggedIn, userObj, setUserObj }) => {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        {isLoggedIn ? (
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
      </Container>
    </Router>
  );
};

export default AppRouter;
