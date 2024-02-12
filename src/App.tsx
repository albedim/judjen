import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage';
import NavBar from './components/sidebar';
import Friends from './pages/friends';
import Create from './pages/create';
import User from './pages/users';
import { isLoggedIn } from './utils/api';
import RecoverPasswordScreen from './components/recover_password_screen';
import CreatePasswordScreen from './components/create_password_screen';
import Layout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Layout sideBarPage='stories'><HomePage/></Layout>}
        />
        <Route 
          path="/recover" 
          element={<Layout sideBarPage='stories' ><RecoverPasswordScreen/></Layout>} 
        />
        <Route 
          path="/create_password" 
          element={<Layout sideBarPage='stories' ><CreatePasswordScreen/></Layout>} 
        />
        <Route 
          path="/friends" 
          element={<Layout sideBarPage='friends' ><Friends subpage='friends'/></Layout>} 
        />
        <Route 
          path="/friends/requests/sent" 
          element={<Layout sideBarPage='friends' ><Friends subpage='sent_requests'/></Layout>} 
        />
        <Route 
          path="/friends/requests/received" 
          element={<Layout sideBarPage='friends' ><Friends subpage='received_requests'/></Layout>} 
        />
        <Route 
          path="/user/:userId" 
          element={<Layout sideBarPage='account' ><User subPage={"stories"}/></Layout>} 
        />
        <Route 
          path="/user/:userId/favorites" 
          element={<Layout sideBarPage='account' ><User subPage={"favorites"}/></Layout>} 
        />
        <Route 
          path="/create" 
          element={<Layout sideBarPage='create' ><Create/></Layout>} 
        />
        <Route 
          path="/account" 
          element={<Layout sideBarPage='account' ><HomePage/></Layout>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
