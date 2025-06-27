import React from "react";
import "./PreLoader.css";

export default function PreLoader() {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <p>Searching for news...</p>
    </div>
  );
}
