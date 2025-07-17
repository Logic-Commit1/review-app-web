import { IonIcon } from '@ionic/react';
import React from 'react';

import { fileTrayOutline } from 'ionicons/icons';

import './Empty.css';

interface EmptyProps {
  message?: string | React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({
  message = 'Nothing to see here yet...'
}) => {
  return (
    <div id="empty">
      <IonIcon icon={fileTrayOutline} />
      <p>{message}</p>
    </div>
  );
};

export default Empty;
