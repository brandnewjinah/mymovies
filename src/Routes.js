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
import Continue from "./mypages/Continue";
import Profile from "./mypages/Profile";
import Recommend from "./mypages/Recommend";
import Detail from "./pages/Details";

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
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/recommend" component={Recommend} />
          <Route exact path="/continue" component={Continue} />
          <Route exact path="/movie/:id" component={Detail} />
          <Route exact path="/tv/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};

export default Routes;
