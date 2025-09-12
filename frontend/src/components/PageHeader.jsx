// File: frontend/src/components/PageHeader.jsx

import React from 'react';

const PageHeader = ({ title, subtitle }) => (
  <header className="mb-8 text-center">
    <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary sm:text-5xl">
      {title}
    </h1>
    <p className="mt-2 text-lg text-brand-subtext">{subtitle}</p>
    <div className="mt-4 h-1 w-24 bg-brand-primary mx-auto rounded-full"></div>
  </header>
);

export default PageHeader;