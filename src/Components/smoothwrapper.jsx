
import ReactLenis from "lenis/react";
import React from "react";

const SmoothWrapper = ({ children }) => {
  return <ReactLenis root options={{lerp : 0.07}}>{children}
  </ReactLenis>;
};

export default SmoothWrapper;
