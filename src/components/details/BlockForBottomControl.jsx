import * as React from "react";
import PropTypes from 'prop-types';
const Block = props => {
    const { inViewport, forwardedRef } = props;
    
    return (
      <div className="viewport-block" ref={forwardedRef}>
       
        <div style={{ width: "400px", height: "200px"}} />
      </div>
    );
  };

export default Block;
  