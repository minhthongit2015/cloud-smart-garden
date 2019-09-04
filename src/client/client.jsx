import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const App = React.lazy(() => import('./app/app'));

render(
  <BrowserRouter>
    <React.Suspense fallback={
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">loading...</div>
    }
    >
      <App />
    </React.Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);
