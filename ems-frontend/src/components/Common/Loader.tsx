import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  const loaderContainerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999999,
  };

  return (
    <div style={loaderContainerStyle}>
      <RingLoader color="#008080" size={100} />
    </div>
  );
};

export default Loader;
