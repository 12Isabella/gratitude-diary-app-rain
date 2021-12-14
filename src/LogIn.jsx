import React from "react";
import { useState } from "react";

const LogIn = (props) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  function handleEmailInput(event) {
    console.log(event.target.value);
    setEmailInput(event.target.value);
  }

  function handlePasswordInput(event) {
    setPasswordInput(event.target.value);
  }

  function handleSignUp(event) {
    event.preventDefault();
    props.signUp(emailInput, passwordInput);
  }

  function handleLogIn(event) {
    event.preventDefault();
    props.logIn(emailInput, passwordInput);
  }

  return (
    <div className="LogIn">
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={handleEmailInput}
        />
      </div>
      <div className="mb-3">
        <input
          onChange={handlePasswordInput}
          type="password"
          placeholder="password"
          className="form-control"
          id="inputPassword"
        />
      </div>
      <button onClick={handleSignUp} className=" btn btn-dark p-2 me-1">
        Sign up
      </button>
      <button onClick={handleLogIn} className=" btn btn-dark p-2">
        Log in{" "}
      </button>
    </div>
  );
};
export default LogIn;
