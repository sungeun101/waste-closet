import React, { useState } from 'react';
import GlobalStyle, { Container } from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import QnA from './pages/QnA';
import Dimmer from './components/Dimmer';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        {showModal && <Dimmer setShowModal={setShowModal} />}
        <Container>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/qna">
              <QnA showModal={showModal} setShowModal={setShowModal} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
