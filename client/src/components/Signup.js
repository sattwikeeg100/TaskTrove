import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "",phone: "",work: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});
    console.log(user);
  }

  // Using fetchAPI. FetchAPI returns promises.
  const PostData = async (e) => {
    e.preventDefault(); // taki form automatically reload wagera na ho.

    const {name, email, phone, work, password, cpassword} = user;

    // fetch here returns a promise
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data = await res.json();

    if(res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }
    else{
      window.alert("Registration Successful.");
      console.log("Registration Successful.");

      navigate("/signin");
    }
  }

  return (
    <div className='signup template d-flex justify-content-center align-items-center vh-100'>
      <div className='form_container shadow p-5 pb-4 rounded bg-white'>
      <form method='POST'>
        <h3 className='text-center'>Sign Up</h3>
        <div className='mb-2'>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' value={user.name} onChange={handleInputs} placeholder="Enter Name" className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' value={user.email} onChange={handleInputs} placeholder="Enter Email" className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="name">Phone Number</label>
          <input type="tel" name='phone' value={user.phone} onChange={handleInputs} placeholder="Enter Phone no." className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="work">Work</label>
          <input type="text" name='work' value={user.work} onChange={handleInputs} placeholder="Enter Profession" className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' value={user.password} onChange={handleInputs} placeholder="Enter Password" className='form-control'/>
        </div>
        <div className='mb-2'>
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name='cpassword' value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" className='form-control'/>
        </div>

        <div className='d-grid mt-3'>
          <button className='btn btn-primary' onClick={PostData}>Sign up</button>
        </div>
        <p className='text-end mt-2'>
          Already registered?<Link to="/signin" className='ms-2'>Sign In</Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default Signup
