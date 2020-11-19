import * as React from 'react';
import PropTypes from 'prop-types';
const ClearButton = props => {
    const { isVisible, click } = props;
  
    return (!!isVisible.length) ? (
      <button className="form__input-clear" onClick={click}>
        <svg width="32" height="32" className="form__input-clear-svg" version="1.1" viewBox="0 0 32 32" aria-hidden="false">
          <path d="M25.33 8.55l-1.88-1.88-7.45 7.45-7.45-7.45-1.88 1.88 7.45 7.45-7.45 7.45 1.88 1.88 7.45-7.45 7.45 7.45 1.88-1.88-7.45-7.45z"></path>
        </svg>
      </button>
    ) : null;
  };

  export default ClearButton;

  ClearButton.propTypes ={
    isVisible:PropTypes.string,
    click:PropTypes.func,
  }
  