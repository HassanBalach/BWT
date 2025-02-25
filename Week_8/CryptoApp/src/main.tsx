import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { store } from './app/store'
import { Provider } from 'react-redux'
import 'antd/dist/reset.css'; // Use the reset.css for Ant Design v5+
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
