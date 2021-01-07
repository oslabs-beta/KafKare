import React from 'react';
import Brokers from './components/Brokers';
import Topics from './components/Topics';
import Zookeeper from './components/Zookeeper';
import VirtualMem from './components/VirtualMem';
import Cpu from './components/Cpu';
import Health from './components/Health';
import Lag from './components/Lag';
import mainLogo from './assets/KafKareTsmall.png';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const MainDashboard = () => {
  return (
    <div className="body">
      <div className="logo-container">
        <img src={mainLogo} width="168" height="65" />
      </div>
      <div className="header-container">
        <div className="grid-item">
          <Brokers />
        </div>

        <Link to="/TopicDrill" className="grid-item grid-topics iframe special">
          <Topics />
        </Link>

        <div className="grid-item grid-zookeeper">
          <Zookeeper />
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-item grid-virtualmem">
          <VirtualMem />
        </div>
        <div className="grid-item grid-cpu">
          <Cpu />
        </div>
        {/* <div className="grid-item grid-consumers">
          <Consumers />
        </div> */}
        <div className="grid-item grid-health">
          <Health />
        </div>
        <div className="grid-item grid-lag">
          <Lag />
        </div>
      </div>
      <div className="main-container"></div>
    </div>
  );
};

export default MainDashboard;
