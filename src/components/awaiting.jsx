import React, { Suspense } from "react";
const EmptyLoader = () => null;
const Awaiting = (Component) => {
  return (props) => (
    <Suspense fallback={EmptyLoader()}>
      <Component {...props} />
    </Suspense>
  );
};
export default Awaiting;
