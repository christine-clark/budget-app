import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Page not found should display when browsing to a page that does not exist.
 */
const NotFoundPage = () => {
  return (
    <main>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </main>
  );
};

export default NotFoundPage;
