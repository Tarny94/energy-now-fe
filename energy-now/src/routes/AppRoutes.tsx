
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import UserPage from '../pages/UserPage';
import ClientPage from '../pages/ClientPage'
import Registration from '../pages/auth/Registration';
import Loggin from '../pages/auth/Loggin';
import AdminTab from '../pages/tab-pages/AdminTab';
import ClientConfiguration from '../pages/ClientConfiguration';

// import AuthPage from '../pages/AuthPage';
// import AboutUsPage from '../pages/AboutUsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" 
              //  element={<LandingPage />} // This is the original code
              //  element={<AdminTab />}
              element={<ClientConfiguration />}
                />
        <Route path="/user" element={<UserPage />} />
        <Route path="/client" element={<ClientPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/loggin" element={<Loggin />} />
        {/* <Route path="/auth" element={<AuthPage />} />
        <Route path="/about-us" element={<AboutUsPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
