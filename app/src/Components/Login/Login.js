import React from 'react';
import { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { UserAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = UserAuth()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {   
      await login(email, password);
      navigate('/')
    } catch (error) {
      setErrorMessage(error.message);
    }
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
          />
          <br />
          <br />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button>Login</button>
        </form>
        <Link className='a' to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
