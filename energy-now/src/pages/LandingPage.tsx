// pages/ClientPage.tsx
import React, { useState } from 'react';
import Tab from '../components/Tab';
import FindElectricianPage from './FindElectricianPage';

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('electrician');

  return (
    <div>
        <div>
            <Tab label="Get My Electrician" active={activeTab === 'electrician'} onClick={() => setActiveTab('electrician')} />
            <Tab label="My Tickets Status" active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
            <Tab label="Electrician Tickets Status" active={activeTab === 'electricianTickets'} onClick={() => setActiveTab('electricianTickets')} />
            <Tab label="Administration Clients" active={activeTab === 'administrationClients'} onClick={() => setActiveTab('administrationClients')} />
            <Tab label="About Us" active={activeTab === 'aboutUs'} onClick={() => setActiveTab('aboutUs')} />
            <Tab label="Contact" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
        </div>
      {activeTab === 'electrician' && <div><FindElectricianPage/></div>}
      {activeTab === 'tickets' && <div>Tickets Status Content</div>}
      {activeTab === 'electricianTickets' && <div>Electrician Tickets Status Content</div>}
      {activeTab === 'aboutUs' && <div>About Us Content</div>}
      {activeTab === 'administrationClients' && <div>Administration Clients Content</div>}
      {activeTab === 'contact' && <div>Contact Content</div>}
    </div>
  );
};

export default LandingPage;
