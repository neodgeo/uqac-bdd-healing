import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Home from './home'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { StyleSheet, css } from 'aphrodite';


const { Header, Content, Footer } = Layout;

const App = () => (
  <div>
    <Layout>
      <Header className={ css(styles.header)}>
        <div>SpellFinder</div>
      </Header>
      <Content className={ css(styles.content)}>
        <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/loading" component={Loading} /> */}
            </Switch>
        </Router>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Laurent Maximin ©2019 Created with Ant UED</Footer>
    </Layout>
  </div>
);



export default App;

const styles = StyleSheet.create({
  header:{
    background:'black',
    position:"fixed",
    color:"white",
    zIndex:1000,
    fontSize:18,
    fontWeight:"bold",
    width:"100%",
    textAlign:"center"
  },
  content:{
    padding: '0 50px',
    marginTop:80,
  }
});