import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Admin from './pages/admin';
import Login from './pages/login/Login';
import './App.css';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';
import Barber from './pages/barber';

const App = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username && user.isAdmin) {
      navigate('/admin');
    } else if (user.username && !user.isAdmin) {
      navigate('/barber');
    } else {
      return;
    }
  }, [user, navigate]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/barber' element={<Barber />} />
      </Routes>
    </div>
  );
};

export default App;
