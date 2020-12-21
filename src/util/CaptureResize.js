import { useState } from "react";

const CaptureResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useState(() => {
    const listener = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  });
  return { width };
};

export default CaptureResize;
