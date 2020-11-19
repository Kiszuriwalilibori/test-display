import * as React from "react";
import PropTypes from 'prop-types';
const ImagesHint = props => {
  const { hint } = props;
  return hint && hint.label && hint.value ? (
    <div data-image_hint={hint.value} className="images-hint">
      {hint.label}
    </div>
  ) : null;
};
export default ImagesHint;

ImagesHint.propTypes = {hint: PropTypes.object};
