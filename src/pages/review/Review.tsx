import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonIcon,
  IonTextarea
} from '@ionic/react';
import { useEffect, useMemo, useState } from 'react';
import { useBusinessesContext } from '../../contexts/BusinessesContext';
import { useReviewsContext } from '../../contexts/ReviewsContext';
import { useParams } from 'react-router-dom';
// import Logo from '// omponents/common/logo/Logo';
import Loading from '@/components/common/loading/Loading';
import Invalid from '@/components/common/invalid/Invalid';
import FacebookReviewModal from '@/components/common/facebookReviewModal/FacebookReviewModal';
import { star, starOutline } from 'ionicons/icons';
import './Review.css';

interface RouteParams {
  id: string;
}

const Review: React.FC = () => {
  const { id: businessId } = useParams<RouteParams>();
  const {
    selectedBusiness,
    businessLoading,
    businessLoaded,
    fetchBusiness
  } = useBusinessesContext();
  const {
    createReviewMutation
  } = useReviewsContext();

  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);

  useEffect(() => {
    if (businessId) {
      fetchBusiness(businessId);
    }
  }, [businessId, fetchBusiness]);

  const loading = !businessLoaded || businessLoading;

  const copy = useMemo(() => ({
    loadingMessage: 'Loading...',
    header: (
      <IonText>
        {selectedBusiness?.name || ''}
      </IonText>
    ),
    location: selectedBusiness?.location ? `${selectedBusiness.location}` : '',
    submitButton: 'Submit',
    successMessage: 'Thank you for your review!'
  }), [selectedBusiness]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessId) return;
    try {
      await createReviewMutation.mutateAsync({
        business_id: businessId,
        name,
        rating,
        comment
      });
      setSubmitted(true);
      setSubmittedRating(rating);

      // Show Facebook modal if rating > 3 and business has facebook_url
      if (rating > 3 && selectedBusiness?.facebook_url) {
        setShowFacebookModal(true);
      }
      setName('');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IonPage id="review">
      <IonContent className="review-content">
        <div className={`review-container ${loading ? 'loading' : ''}`}>
          {loading ? (
            <Loading />
          ) : selectedBusiness ? (
            <>
              <div className="business-details">
                <p className="business-name">{copy.header}</p>
                <p className="business-location">{copy.location}</p>
              </div>
              <form className="review-form" onSubmit={handleSubmit}>

                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map(num => (
                    <IonIcon
                      key={num}
                      icon={num <= rating ? star : starOutline}
                      color={num <= rating ? 'warning' : 'medium'}
                      className="star-icon"
                      onClick={() => setRating(num)}
                      data-testid={`star-${num}`}
                    />
                  ))}
                </div>

                <IonInput
                  value={name}
                  onIonChange={e => setName(e.detail.value ?? '')}
                  required
                  placeholder="Name (optional)"
                  clearInput={true}
                />

                <IonTextarea
                  value={comment}
                  onIonChange={e => setComment(e.detail.value ?? '')}
                  required
                  placeholder="Share your experience at this place..."
                  autoGrow={true}
                  maxlength={500}
                />
                <IonButton
                  className='submit-button'
                  type="submit"
                  expand="block"
                  fill="solid"
                  size="large"
                  strong
                  disabled={rating === 0}
                >
                  {copy.submitButton}
                </IonButton>
                {submitted && <div className="success-message">{copy.successMessage}</div>}
              </form>
              {/* Facebook Review Modal */}
              <FacebookReviewModal
                isOpen={showFacebookModal}
                onClose={() => setShowFacebookModal(false)}
                businessName={selectedBusiness?.name || ''}
                facebookUrl={selectedBusiness?.facebook_url || ''}
                rating={submittedRating}
              />
            </>
          ) : (
            <Invalid />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Review;

