import React from 'react';

import './Padding.css';

interface PaddingProps {
  children: React.ReactNode;
}

const Padding: React.FC<PaddingProps> = ({ children }) => {
  return (
    <div id="padding" className="ion-padding">
      {children}
    </div>
  );
};

export default Padding;
