import React from 'react';

import { render } from 'react-dom';
import App from './App';
import './App.css';

const title = 'Hello and welcome to KafKare';
console.log('indexJS');

render(<App title={title} />, document.getElementById('app'));

//below makes hot reloading available
module.hot.accept();
