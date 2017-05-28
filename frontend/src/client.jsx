import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

const app = document.getElementById('app');

const router = (
  <App />
);

ReactDOM.render(router, app);
