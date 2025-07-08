import React from "react";
import { useEffect, useRef } from "react";

const MathBoxRenderer = ({ code }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const render = () => {
      if (!window.mathBox || !window.THREE) return;
      containerRef.current.innerHTML = "";
      try {
        const fn = new Function("container", code);
        fn(containerRef.current);
      } catch (err) {
        console.error("MathBox render error:", err);
      }
    };
    render();
  }, [code]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};

export default MathBoxRenderer;
