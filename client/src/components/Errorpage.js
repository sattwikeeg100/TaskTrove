import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page d-flex flex-column justify-content-center align-items-center vh-100">
      <h2><p>Oops! Page Not Found</p></h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>You can return to the <Link to="/">homepage</Link> or navigate to another page using the menu above.</p>
    </div>
  );
}

export default ErrorPage;
