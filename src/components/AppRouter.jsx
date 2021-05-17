import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle, { Container } from '../globalStyles';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import QnA from '../pages/QnA';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        {isLoggedIn ? (
          <Switch>
            <Route path="/" exact>
              <Navigation />
              <Home />
            </Route>
            <Route path="/qna">
              <Navigation />
              <QnA />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Container>
    </Router>
  );
};

export default AppRouter;
