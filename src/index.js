import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';
import './App.css';

render(<App />, document.getElementById('app'));

//below makes hot reloading available
module.hot.accept();
