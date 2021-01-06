import React from 'react';
import MainDashboard from './MainDashboard';
import TopicsDrill from './components/TopicsDrill';
import registerPage from './components/views/registerPage';
import loginPage from './components/views/loginPage';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/auth/auth';
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={loginPage} />
      <Route exact path="/register" component={registerPage} />
      <Route exact path="/dashboard" component={MainDashboard} />
      <Route exact path="/TopicDrill" component={TopicsDrill} />
    </Switch>
  </Router>
);

export default App;
