import React from 'react';
import 'antd/dist/antd.css';
import GlobalStyle, { Container } from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import QnA from './pages/QnA';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
