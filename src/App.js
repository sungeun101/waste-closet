import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import QnA from "./pages/QnA";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navigation/>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/qna">
              <QnA />
            </Route>
          </Switch> 
        </div>
    </Router>
    </div>
  );
}

export default App;
