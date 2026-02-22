import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from "./components/Home"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import List from "./components/List";
import  Details from "./components/Details";
import Profile from "./components/Profile"
import Photo from "./components/Photo"
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/details" element={<Details />} />
      <Route path="/list" element={<List />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}

export default App
