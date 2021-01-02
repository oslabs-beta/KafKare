import React from 'react';
import MainDashboard from './MainDashboard';
import TopicsDrill from './components/TopicsDrill';
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainDashboard} />
      <Route exact path="/TopicDrill" component={TopicsDrill} />
    </Switch>
  </Router>
);

export default App;
