import React from "react";
import LoginButton from "../loginButton";

const LandingPage = () => {
  return (
    <>
      <div className="container text-center">
        <h1>Welcome To Smart Teams</h1>
        <p>
          The best and smartest way to collaborate and increase productivity
        </p>
        <LoginButton />
      </div>
    </>
  );
};

export default LandingPage;
