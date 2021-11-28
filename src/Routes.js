import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//import components
import Layout from "./components/main/Layout";

//import pages
import Home from "./pages/Home/Home";
import Test from "./pages/boiler";
import Rate from "./pages/Rate";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Continue from "./pages/Continue";
import Profile from "./pages/Profile/Profile";
import Recommendation from "./pages/Recommendation/Recommendation";
import Details from "./pages/Details/Details";
import Category from "./pages/Category/Category";
import Demo from "./pages/Demo/Demo";

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
        </Layout>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
