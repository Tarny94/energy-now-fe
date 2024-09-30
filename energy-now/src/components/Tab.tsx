// components/Tab.tsx
import React from 'react';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <button onClick={onClick} style={{ fontWeight: active ? 'bold' : 'normal' }}>
      {label}
    </button>
  );
};

export default Tab;
