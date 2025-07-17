import { IonContent, IonPage, NavContext } from '@ionic/react';
import { useCallback, useContext, useEffect } from 'react';

// import Loading from '@/components/common/loading/Loading';
// import Loading from '../../components/common/loading/Loading';
import Loading from '@/components/common/loading/Loading';
// import Logo from '@/components/common/logo/Logo';
import Padding from '@/components/common/padding/Padding';
import { getBusinessIdByShareCode } from '@/data/Shares';
import { ROUTES, getReviewRoute } from '@/utils/routes';
import { useParams } from 'react-router';

const Share: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { id: code } = useParams<{ id: string }>();

  const fetchBusinessId = useCallback(async () => {
    try {
      if (code) {
        const businessId = await getBusinessIdByShareCode(code);
        navigate(
          businessId ? getReviewRoute(businessId) : getReviewRoute(code)
        );
      } else {
        navigate(ROUTES.INVALID);
      }
    } catch {
      if (code) {
        navigate(getReviewRoute(code));
      } else {
        navigate(ROUTES.INVALID);
      }
    }
  }, [code, navigate]);

  useEffect(() => {
    fetchBusinessId();
  }, [fetchBusinessId]);

  return (
    <IonPage id="share">
      <IonContent>
        <Padding>
          {/* <Logo /> */}
          <Loading />
        </Padding>
      </IonContent>
    </IonPage>
  );
};

export default Share;
