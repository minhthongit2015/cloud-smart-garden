import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LeafLoading from './app/components/loadings/LeafLoading';

const App = React.lazy(() => import('./app/app'));

render(
  <BrowserRouter>
    <React.Suspense fallback={LeafLoading}>
      <App />
    </React.Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
