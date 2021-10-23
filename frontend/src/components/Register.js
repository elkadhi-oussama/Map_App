import { Room ,Cancel} from "@material-ui/icons";
import axios from "axios";
import React, { useState, useRef } from "react";
import "./register.css";

const Register = ({setShowRegister}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("/user/Register", newUser);
      setError(false);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Elkadhi_Map
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="RegisterBtn">Register</button>
        {success && (
          <span className="success">Successfull. You can login now !</span>
        )}
        {error && <span className="failure"> Something went wrong!</span>}
      </form>
      <Cancel className="registerCancel" onClick = {()=> setShowRegister(false)} />
    </div>
  );
};

export default Register;
