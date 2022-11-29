import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewJobs from './components/ViewJobs';

const Admin = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) {
      navigate('/');
    } else if (user.username && !user.isAdmin) {
      navigate('/barber');
    } else {
      return;
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <ViewJobs />
    </>
  );
};

export default Admin;
