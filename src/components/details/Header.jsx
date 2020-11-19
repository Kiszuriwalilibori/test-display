import * as React from "react";
import PropTypes from 'prop-types';
const Header = React.memo(() => {
  return (
    <>
      <span className="search__unsplash">Unsplash</span>
      <h1 className="search__header search-text search-text--small">
        The internet’s source of
        <a className="search__license" href="https://unsplash.com/license">
          {" "}
          freely-usable images
        </a>
      </h1>
      <p className="search__motto">Powered by creators everywhere.</p>
    </>
  );
});

export default Header;
