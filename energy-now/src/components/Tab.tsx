// components/Tab.tsx
import React from 'react';
import Button from '../components/Button';

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  return (
    <Button
      variant={'contained'}
      color={active ? 'primary' : 'warning' }
      onClick={onClick}
      size="large"
      sx={{ color: 'whitesmoke', fontSize: 19, fontWeight: 'bold', fontFamily: 'cursive', padding: 2 }}
      label={label}
    />
  );
};

export default Tab;
