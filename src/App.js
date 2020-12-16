import React from 'react';
import Brokers from './components/Brokers';
import Topics from './components/Topics';
import Zookeeper from './components/Zookeeper';
import VirtualMem from './components/VirtualMem';
import Cpu from './components/Cpu';
import Consumers from './components/Consumers';
import Health from './components/Health';
import Lag from './components/Lag';
import Producers from './components/Producers';
import mainLogo from './assets/KafKareTsmall.png';

const App = (props) => {
  // console.log(props.title);
  const { title } = props;
  // console.log(props, title);

  const link =
    'http://localhost:3000/d-solo/lgLiWf1Mz/topic-partition-test?orgId=1&from=1607951714194&to=1607973314194&panelId=2';
  return (
    <div className="body">
      <div className="logo-container">
        <img src={mainLogo} width="168" height="65" />
      </div>
      <div className="header-container">
        <div
          className="grid-item grid-brokers
        "
        >
          <Brokers />
        </div>
        <div className="grid-item grid-topics">
          <Topics />
        </div>
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
        <div className="grid-item grid-consumers">
          <Consumers />
        </div>
        <div className="grid-item grid-health">
          <Health />
        </div>
        <div className="grid-item grid-lag">
          <Lag />
        </div>
        <div className="grid-item grid-producers">
          <Producers />
        </div>

        {/* <iframe src={link} width="450" height="200" frameBorder="0"></iframe> */}
      </div>
      <div className="main-container"></div>
    </div>
  );
};

export default App;
