import React from 'react';

interface SpacerProps {
  children?: React.ReactNode;
  top?: number; // Space above the component (in px, e.g., 10)
  bottom?: number; // Space below the component (in px, e.g., 10)
  left?: number; // Space to the left of the component (in px, e.g., 10)
  right?: number; // Space to the right of the component (in px, e.g., 10)
}

const Spacer: React.FC<SpacerProps> = ({
  top = 0,
  bottom = 0,
  left = 0,
  right = 0,
  children
}) => {
  return (
    <div
      style={{
        marginTop: `${top}px`,
        marginBottom: `${bottom}px`,
        marginLeft: `${left}px`,
        marginRight: `${right}px`
      }}
    >
      {children}
    </div>
  );
};

export default Spacer;
