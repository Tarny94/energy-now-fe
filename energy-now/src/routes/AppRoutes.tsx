
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import UserPage from '../pages/UserPage';
import ClientPage from '../pages/ClientPage'

// import AuthPage from '../pages/AuthPage';
// import AboutUsPage from '../pages/AboutUsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/client" element={<ClientPage />} />
        {/* <Route path="/auth" element={<AuthPage />} />
        <Route path="/about-us" element={<AboutUsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
