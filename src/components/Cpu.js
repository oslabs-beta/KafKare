import React from 'react';

function Cpu() {
  return (
    <div className="cpu component">
      <h1>CPU info</h1>
      <iframe
        src="http://localhost:3000/d-solo/2LyxeP1Mk/total-messages?orgId=1&panelId=6"
        width="400"
        height="180"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Cpu;
