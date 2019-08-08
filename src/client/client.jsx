import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './Store';

const App = React.lazy(() => import('./app/app'));

const store = configureStore();

render(
  <BrowserRouter>
    <Provider store={store}>
      <React.Suspense fallback={<div>loading ...</div>}>
        <App />
      </React.Suspense>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
