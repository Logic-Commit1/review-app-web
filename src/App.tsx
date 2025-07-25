import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { QueryProvider } from './contexts/QueryContext';
import { BusinessesProvider } from './contexts/BusinessesContext';

import Home from './pages/Home';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
// import './theme/variables.css';
import { ROUTES } from './utils/routes';
import Share from './pages/share/Share';
import Review from './pages/review/Review';
import { ReviewsProvider } from './contexts/ReviewsContext';
import Invalid from './components/common/invalid/Invalid';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <QueryProvider>
        <ReviewsProvider>
          <BusinessesProvider>
            <IonRouterOutlet>
              <Route exact path={ROUTES.ROOT}>
                <Home />
              </Route>
              <Route exact path={ROUTES.SHARE}>
                <Share />
              </Route>
              <Route exact path={ROUTES.REVIEW}>
                <Review />
              </Route>
              <Route exact path={ROUTES.INVALID}>
                <Invalid />
              </Route>
            </IonRouterOutlet>
          </BusinessesProvider>
        </ReviewsProvider>
      </QueryProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
