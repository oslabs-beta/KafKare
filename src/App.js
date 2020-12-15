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

const App = (props) => {
  // console.log(props.title);
  const { title } = props;
  // console.log(props, title);

  const link =
    'http://localhost:3000/d-solo/lgLiWf1Mz/topic-partition-test?orgId=1&from=1607951714194&to=1607973314194&panelId=2';
  return (
    <div>
      <h1>{title}</h1>
      <div className="header-container">
        <ul>
          <li>
            <Brokers />
          </li>
          <li>
            <Topics />
          </li>
          <li>
            <Zookeeper />
          </li>
          <li>
            <VirtualMem />
          </li>
          <li>
            <Cpu />
          </li>
          <li className="consumers">
            <Consumers />
          </li>
          <li>
            <Health />
          </li>
          <li>
            <Lag />
          </li>
          <li>
            <Producers />
          </li>
        </ul>
        {/* <iframe src={link} width="450" height="200" frameBorder="0"></iframe> */}
      </div>
      <div className="main-container"></div>
    </div>
  );
};

export default App;
