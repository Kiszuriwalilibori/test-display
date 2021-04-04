import * as React from "react";
import PropTypes from 'prop-types';

const Input = props => {
  const { pattern, callback } = props;
  
  
  return <input type="text" className="form__input" value={pattern} onChange={callback} autoCapitalize="none" placeholder="Search free high-resolution photos" />;
};

export default Input;

Input.propTypes = {
  pattern: PropTypes.string,
  callback : PropTypes.func,
}
