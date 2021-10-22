import React from "react";
import Loading from "./../assets/loading2.gif";
import "./component.css";

export default function LoadingComponent() {
  return (
    <div className="loading-page">
      <img src={Loading} alt="loading" />
      <p>
        <strong>Loading ...</strong>
      </p>
    </div>
  );
}
