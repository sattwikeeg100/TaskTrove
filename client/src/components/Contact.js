import React, { useState, useEffect} from 'react';

const Contact = () => {

  const [userData, setUserData] = useState({name: "", email: "", message:""});

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUserData({...userData, name:data.name, email:data.email});

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    }
    
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userContact();
  }, []);


  // we are storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value}); // dynamic data changing
  }

  // sending the data to the backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, message } = userData;

    const res = await fetch('/contactus', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, message
      })
    });

    const data = await res.json();
    const status = res.statusCode;

    if (!data || !data.message) {
      console.log("Message not send");
      alert("Cannot sent message");
    } else {
      alert("Message Send Successfully");
      setUserData({ ...userData, message: ""});
    }
  }

  return (
    <div className="contact d-flex justify-content-center align-items-center vh-100">
    <div className='form_container shadow p-5 rounded bg-white'>
      <h3>Contact Us</h3>
      <form method='POST'>
        <div className='mb-2'>
          <label htmlFor="name">Name</label>
          <input type="name" className='form-control'
            name='name'
            value={userData.name} 
            onChange={handleInputs}
            placeholder="Your name" 
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control'
            name='email'
            value={userData.email} 
            onChange={handleInputs}
            placeholder="Your email"
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="message">Message</label>
          <input type="text" className='form-control'
            name='message'
            value={userData.message} 
            onChange={handleInputs}
            placeholder="Enter message"
          />
        </div>
        
        <div className='d-grid mt-3'>
          <button className='btn btn-primary' onClick={contactForm}>Send</button>
        </div>
        
      </form>
    </div>
    </div>
  );
};

export default Contact
