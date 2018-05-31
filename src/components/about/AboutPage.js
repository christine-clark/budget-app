import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/about-page.css';

const AboutPage = () => {
  return (
    <main>
      <h2 className="alt-header">About</h2>
      <p>
        This budget app is created with the <a href="https://github.com/coryhouse/react-slingshot">React-Slingshot</a> starter kit by Cory House.
      </p>
      <p>
        <Link to="/badlink">Click this bad link</Link> to see the 404 page.
      </p>
    </main>
  );
};

export default AboutPage;
