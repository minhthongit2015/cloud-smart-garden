import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LeafLoading from './app/components/utils/loadings/LeafLoading';

const App = React.lazy(() => import('./app/app'));

render(
  <BrowserRouter>
    <React.Suspense fallback={<LeafLoading overlaping text="Climate Strike Vietnam" />}>
      <App />
    </React.Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
