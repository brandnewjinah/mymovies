import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from "./components/layout/Layout";

//import pages
import Home from "./pages/Home";
import Rate from "./pages/Rate";
import Profile from "./pages/Profile";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Continue from "./pages/Continue";
import Recommendation from "./pages/Recommendation";
import Details from "./pages/Details/Details";
import Category from "./pages/Category/Category";
import Demo from "./pages/DemoProfile/Demo";
import DemoRecommend from "./pages/DemoRecommend";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Layout>
          <Route exact path="/movies/rate" component={Rate} />
          <Route exact path="/movies/profile" component={Profile} />
          <Route exact path="/movies/movie/:id" component={Details} />
          <Route exact path="/movies/director/:id" component={Category} />
          <Route exact path="/movies/keyword/:id" component={Category} />
          <Route exact path="/movies/genre/:id" component={Category} />
          <Route exact path="/movies/recommend" component={Recommendation} />
          <Route exact path="/movies/continue" component={Continue} />
          <Route exact path="/movies/search" component={Search} />
          <Route exact path="/movies/demoprofile" component={Demo} />
          <Route exact path="/movies/demorecommend" component={DemoRecommend} />
        </Layout>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
