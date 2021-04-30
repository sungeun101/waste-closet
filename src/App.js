import React from 'react';
import 'antd/dist/antd.css';
import GlobalStyle, { Container } from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import QnA from './pages/QnA';

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        <Container>
          <Navigation />
          <Switch>
            <Route path="/qna">
              <QnA />
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
