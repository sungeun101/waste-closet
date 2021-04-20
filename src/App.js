import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from "./components/Navigation";
import { questionData } from "./data/questionData";
import Home from "./pages/Home";
import QnA from "./pages/QnA";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          
          {/* <Navigation /> */}
          <nav>
            <ul>
              <li>
                <Link to="/">품목검색</Link>
              </li>
              <li>
                <Link to="/qna">Q&amp;A</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/qna">
              <QnA questionData={questionData}/>
            </Route>
          </Switch> 
        </div>
    </Router>
    </div>
  );
}

export default App;
