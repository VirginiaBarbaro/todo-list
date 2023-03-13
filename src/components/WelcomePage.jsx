import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="container landing-page">
      <div className="row">
        <h1>Welcome at ToBuy! (Public)</h1>
        <h3>
          Please <Link to="/login">login</Link> to continue
        </h3>
      </div>
    </div>
  );
}

export default WelcomePage;
