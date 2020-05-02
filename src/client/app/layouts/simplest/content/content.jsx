import React from 'react';
import './content.scss';

export default ({ children }) => (
  <article id="body" className="flex-fill h-100">
    {children}
  </article>
);
