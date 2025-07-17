import React from 'react';

import './ProgressBar.css';

interface ProgressBarProps {
  totalSteps: number;
  currentProgress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalSteps,
  currentProgress
}) => {
  if (totalSteps < 1) return null;
  if (currentProgress > totalSteps) return null;
  if (currentProgress < 0) return null;

  return (
    <div className="progressBar">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`bar ${index <= currentProgress ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
