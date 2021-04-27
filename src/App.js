import React from 'react';
// import GlobalStyle from './globalStyles';
import { Container } from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import QnA from './pages/QnA';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <GlobalStyle /> */}
        <Container>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/qna">
              <QnA />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
