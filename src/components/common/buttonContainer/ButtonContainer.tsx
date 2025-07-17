import React from 'react';

import useDimensions from '@/hooks/useDimensions';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

import './ButtonContainer.css';

interface ButtonContainerProps {
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  hideOnKeyboardOpen?: boolean;
  transparent?: boolean;
  children: React.ReactNode;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  position = 'fixed',
  hideOnKeyboardOpen = true,
  transparent = true,
  children
}) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { height } = useDimensions();

  if (hideOnKeyboardOpen && isKeyboardOpen && height && height <= 800) {
    return null;
  }

  return (
    <div
      id="buttonContainer"
      className={`ion-padding ${transparent ? 'transparent' : ''}`}
      style={{ position }}
    >
      {children}
    </div>
  );
};

export default ButtonContainer;
