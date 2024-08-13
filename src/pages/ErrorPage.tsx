// NotAuthenticatedPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const ErroPage: React.FC = () => {
  return (
    <div>
      <h1>Oops!!!</h1>
      <p>This page doens't exist.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ErroPage;