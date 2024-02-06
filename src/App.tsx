import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import NavBar from './components/navbar';
import Friends from './pages/friends';
import Create from './pages/create';
import User from './pages/users';
import { isLoggedIn } from './utils/api';
import RecoverPasswordScreen from './components/recover_password_screen';
import CreatePasswordScreen from './components/create_password_screen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className='flex' ><NavBar page='stories' /><HomePage/></div>} />
        <Route path="/recover" element={<div className='flex' ><NavBar page='stories' /><RecoverPasswordScreen/></div>} />
        <Route path="/create_password" element={<div className='flex' ><NavBar page='stories' /><CreatePasswordScreen/></div>} />
        <Route path="/friends" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='friends'/></div>} />
        <Route path="/user/:userId" element={<div className='flex' ><NavBar page='account' /><User subPage={"stories"}/></div>} />
        <Route path="/user/:userId/favorites" element={<div className='flex' ><NavBar page='account' /><User subPage={"favorites"}/></div>} />
        <Route path="/friends/requests/sent" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='sent_requests'/></div>} />
        <Route path="/friends/requests/received" element={<div className='flex' ><NavBar page='friends' /><Friends subpage='received_requests'/></div>} />
        <Route path="/create" element={<div className='flex' ><NavBar page='create' /><Create/></div>} />
        <Route path="/account" element={<div className='flex' ><NavBar page='account' /><HomePage/></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
