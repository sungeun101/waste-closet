import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle, { Container } from '../globalStyles';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import QnA from '../pages/QnA';
import Navigation from './Navigation';

const AppRouter = () => {
  return (
    <Router>
      <GlobalStyle />
      <Container>
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
      </Container>
    </Router>
  );
};

export default AppRouter;
