import React, { useRef, useState } from 'react';
import {UserAuth} from '../../context/authContext'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { validateForm } from '../../util/validate';

export default function Signup() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);

  const {signup} = UserAuth()
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const validationError = validateForm(
      name.current.value,
      email.current.value,
      password.current.value,
      phone.current.value
    )
    if(validationError){
      setErrorMessage(validationError);
      return;
    }

    try {
      await signup(name.current.value, email.current.value,password.current.value, phone.current.value );
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.message);
    }
   
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
          ref={name}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          ref={email}
            className="input"
            type="email"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          ref={phone}
            className="input"
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          ref={password}
            className="input"
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button>Signup</button>
        </form>
        <Link className='a' to="/login">Login</Link>
      </div>
    </div>
  );
}
