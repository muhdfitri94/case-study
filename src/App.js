import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
