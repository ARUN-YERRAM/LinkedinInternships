import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';
import store from './redux/store';

// Make sure you're rendering to the correct DOM element with id="root"
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')  // Ensure this matches the id in public/index.html
);
