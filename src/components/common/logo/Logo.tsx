import { IonImg, NavContext } from '@ionic/react';
import React, { useContext } from 'react';

import logo from '@/assets/images/logo/ReviewAppLogo.png';
import { ROUTES } from '@/utils/routes';

import './Logo.css';

interface LogoProps {
  navigateToRootOnClick?: boolean;
}

const Logo: React.FC<LogoProps> = ({

  navigateToRootOnClick = false
}) => {
  const { navigate } = useContext(NavContext);
  const bloop = (e: React.MouseEvent<HTMLIonImgElement, MouseEvent>) => {
    const imageElement = e.currentTarget;
    if (imageElement.classList.contains('bloop')) {
      return;
    }
    imageElement.classList.add('bloop');
    setTimeout(() => {
      imageElement.classList.remove('bloop');
    }, 1000);
  };

  const navigateToRoot = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div id="logoContainer">
      <IonImg
        src={logo}
        id="logo"
        onClick={navigateToRootOnClick ? navigateToRoot : bloop}
      />
    </div>
  );
};

export default Logo;
