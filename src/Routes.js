import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import Test from "./pages/boiler";
import Rate from "./pages/Rate";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Continue from "./pages/Continue";
import Profile from "./pages/Profile";
import Recommend from "./pages/Recommend";
import Detail from "./pages/Details";
import Category from "./pages/Category";
import Collection from "./pages/Collection";
import Demo from "./pages/Demo";
import DemoRecommend from "./pages/DemoRecommend";

const Routes = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Layout>
            <Route exact path="/test" component={Test} />
            <Route exact path="/rate" component={Rate} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/demoprofile" component={Demo} />
            <Route exact path="/recommend" component={Recommend} />
            <Route exact path="/demorecommend" component={DemoRecommend} />
            <Route exact path="/continue" component={Continue} />
            <Route exact path="/movie/:id" component={Detail} />
            <Route exact path="/category/:id" component={Category} />
            <Route exact path="/collection/:id" component={Collection} />
            <Route exact path="/keyword/:id" component={Category} />
            <Route exact path="/director/:id" component={Category} />
          </Layout>
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </Router>
  );
};

export default Routes;
