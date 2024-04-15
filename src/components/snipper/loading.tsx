import React from "react";
import "./loading.css"

const Loading = () => {
  return (
    <div className="container">
      <div className="quiver">
        <span className="arrows st"></span>
        <span className="arrows nd"></span>
        <span className="arrows rd"></span>
        <span className="arrows th"></span>
        <span className="arrows fth"></span>
        <span className="loading">Loading</span>
      </div>
    </div>
  );
};

export default Loading