import React from 'react';
import { useState } from 'react';
import Login from './pages/auth/Login/Login';

import Nav from "./Component/Navbar/Nav"
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
   const [isAdmin, setIsAdmin] = useState(true)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Nav isAdmin={isAdmin}/>} />

        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
