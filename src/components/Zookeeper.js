import React from 'react';

function Zookeeper() {
  return (
    <div className="zookeeper component">
      <iframe
        className="zk"
        src="http://localhost:3000/d-solo/2LyxeP1Mk/kafka?orgId=1&panelId=18"
        width="500"
        height="115"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Zookeeper;
