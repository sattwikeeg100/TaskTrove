import React,  { useState, useEffect } from 'react'
import TodoList from './TodoList'
import Carousel from './Carousel'
import 'bootstrap/dist/css/bootstrap.css'

const Home = () => {

  const [userName, setUserName] = useState('Stranger');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUserName(data.name);
      setShow(true);

    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <Carousel />
      <div className="homegreet text-secondary p-2 ps-5"><h2>Hey {userName}! {!show ? '' : 'Happy to see you back :)'} Use tasktrove to manage your daily to-dos.</h2></div>
      <TodoList />
    </>
  )
}

export default Home
