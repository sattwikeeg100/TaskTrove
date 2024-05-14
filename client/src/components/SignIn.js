import React,{ useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../App';

const SignIn = () => {

  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = res.json();

    if (res.status === 400 || !data){
      window.alert("Invalid Credentials");
    } else{
      dispatch({type: "USER", payload:true});
      window.alert("LogIn Successful.");
      navigate("/");
    }

  }

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100'>
      <div className='form_container shadow p-5 rounded bg-white'>
      <form method="POST">
        <h3 className='text-center'>Sign In</h3>
        <div className='mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="password">Password</label>
          <input type="password" className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div>
          <input type="checkbox" className='custom-control custom-checkbox' id="check" />
          <label htmlFor="check" className='custom-input-label ms-2'>
            Remember me
          </label>
        </div>
        <div className='d-grid mt-2'>
          <button className='btn btn-primary' onClick={loginUser}>Sign in</button>
        </div>
        <p className='text-end mt-2'>
          <a href="">Forgot Password?</a><Link to="/signup" className='ms-2'>Sign up</Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default SignIn
