import React, { useState } from "react";
import GlobalStyle, { Container } from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import QnA from "./pages/QnA";
import Dimmer from "./components/Dimmer";
// import ant css

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        {/* Ant Modal을 사용하면 필요없음 */}
        {showModal && <Dimmer setShowModal={setShowModal} />}
        <Container>
          <Navigation />
          <Switch>
            <Route path="/qna">
              <QnA showModal={showModal} setShowModal={setShowModal} />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            {/* 404 페이지 추가하기: https://www.daleseo.com/react-router-basic/ */}
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
