import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import NavBar from './components/navbar';
import Friends from './pages/friends';
import Create from './pages/create';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className='flex' ><NavBar page='stories' /><HomePage/></div>} />
        <Route path="/friends" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='friends'/></div>} />
        <Route path="/friends/requests/sent" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='sent_requests'/></div>} />
        <Route path="/friends/requests/received" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='received_requests'/></div>} />
        <Route path="/create" element={<div className='flex' ><NavBar page='create' /><Create/></div>} />
        <Route path="/account" element={<div className='flex' ><NavBar page='account' /><HomePage/></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
