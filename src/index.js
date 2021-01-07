import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

//below makes hot reloading available
module.hot.accept();
