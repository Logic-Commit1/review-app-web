import { IonSpinner } from '@ionic/react';
import React from 'react';

import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div id="loading">
      <IonSpinner name="crescent" color="primary"></IonSpinner>
      <h3>Loading...</h3>
      <p>Thank you for your patience.</p>
    </div>
  );
};

export default Loading;
