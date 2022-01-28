import React from "react";
import "./cursor.css";
const CustomCursor = () => {
  const cursorRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      const [clientX, clientY] = event;
    });
  }, []);

  return <div className="app-cursor"></div>;
};

export default CustomCursor;
