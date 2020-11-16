import * as React from "react";

const ImagesHint = props => {
  const { hint } = props;
  return hint && hint.label && hint.value ? (
    <div data-image_hint={hint.value} className="images-hint">
      {hint.label}
    </div>
  ) : null;
};
export default ImagesHint;
