import React, { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    //BEM naming convention
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className='app__body'>
        <BrowserRouter>
          <Sidebar/>
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat/>} />
            <Route path="/" element={<Chat/>} />
          </Routes>
        </BrowserRouter> 
      </div>
      )}
    </div>
  );
}

export default App;
