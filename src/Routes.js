import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//import components
import Header from "./components/Header";

//import pages
import Home from "./pages/Movies";
import Search from "./pages/Search";
import TV from "./pages/TV";
import Rate from "./mypages/Rate";

const Routes = () => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/tv" component={TV} />
          <Route exact path="/rate" component={Rate} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};

export default Routes;
