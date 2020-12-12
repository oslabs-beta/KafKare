import React from 'react';

import { render } from 'react-dom';
import App from './App';

const title = 'Welcome to KafKare';
console.log('indexJS');
// ReactDOM.render(<App title={title} />, document.getElementById('app'));
render(<div>'hello'</div>, document.getElementById('app'));

//below makes hot reloading available
module.hot.accept();
