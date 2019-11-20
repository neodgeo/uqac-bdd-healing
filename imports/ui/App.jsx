import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Home from './home'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => (
  <div>
    <Header>Healing</Header>
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/loading" component={Loading} /> */}
        </Switch>
    </Router>
  </div>
);

export default App;
