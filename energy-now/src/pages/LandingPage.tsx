// pages/ClientPage.tsx
import React, { useState } from 'react';
import Tab from '../components/Tab';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('electrician');

  return (
    <div>
      <Tab label="Get My Electrician" active={activeTab === 'electrician'} onClick={() => setActiveTab('electrician')} />
      <Tab label="My Tickets Status" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
      <Tab label="Electrician Tickets Status" active={activeTab === 'electricianTickets'} onClick={() => setActiveTab('electricianTickets')} />
      
      {activeTab === 'electrician' && <div>Electrician Content</div>}
      {activeTab === 'tickets' && <div>Tickets Status Content</div>}
      {activeTab === 'electricianTickets' && <div>Electrician Tickets Status Content</div>}
    </div>
  );
};

export default LandingPage;
