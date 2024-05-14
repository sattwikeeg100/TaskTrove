import React, { createContext, useReducer } from 'react'
import { Routes,Route } from "react-router-dom";
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Footer from './components/Footer';
import ErrorPage from './components/Errorpage';
import Profile from './components/Profile';
import Logout from './components/Logout';

import {initialState, reducer} from "../src/reducer/UseReducer"

// we need contextAPI
export const UserContext = createContext();

// All the routes of my website
const Routings = () => {
  return(
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  )
}


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routings />
      <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App
