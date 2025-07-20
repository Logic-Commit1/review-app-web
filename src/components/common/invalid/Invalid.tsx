import { IonIcon } from '@ionic/react';
import React from 'react';

import { backspaceOutline } from 'ionicons/icons';

import './Invalid.css';

const Invalid: React.FC = () => {
  return (
    <div id="invalid">
      <IonIcon icon={backspaceOutline} />
      <h3>Invalid Schedule Link</h3>
      <p>Please double check and try again or contact your dentist.</p>
    </div>
  );
};

export default Invalid;
