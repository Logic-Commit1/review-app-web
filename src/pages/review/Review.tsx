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

  useEffect(() => {
    if (businessId) {
      fetchBusiness(businessId);
    }
  }, [businessId, fetchBusiness]);

  const loading = !businessLoaded || businessLoading;

  const copy = useMemo(() => ({
    loadingMessage: 'Loading...',
    // subHeader: 'LEAVE A REVIEW',
    header: (
        <IonText color="primary">
          {selectedBusiness?.name || ''}
        </IonText>
    ),
    message: selectedBusiness?.location ? `Location: ${selectedBusiness.location}` : '',
    submitButton: 'Submit Review',
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
      setName('');
      setRating(5);
      setComment('');
    } catch (error) {
      // Optionally handle error
    }
  };

  return (
    <IonPage id="review">
      <IonContent>
        <div className="review-container">
          {/* <Logo /> */}
          {loading ? (
            <Loading />
          ) : selectedBusiness ? (
            <>
              <div className="business-details">
                {/* <h4 id="subHeader">{copy.subHeader}</h4> */}
                <h1 id="header">{copy.header}</h1>
                <p id="message">{copy.message}</p>
              </div>
              <form className="review-form" onSubmit={handleSubmit}>
                <h3>Leave a Review</h3>
                <label>
                  Name
                  <IonInput
                    value={name}
                    onIonChange={e => setName(e.detail.value ?? '')}
                    required
                    placeholder="Your name"
                  />
                </label>
                <label>
                  Rating
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
                </label>
                <label>
                  Comment
                  <IonTextarea
                    value={comment}
                    onIonChange={e => setComment(e.detail.value ?? '')}
                    required
                    placeholder="Share your details of experience at this place"
                  />
                </label>
                <IonButton type="submit" expand="block" fill="solid" size="default" strong>
                  {copy.submitButton}
                </IonButton>
                {submitted && <div className="success-message">{copy.successMessage}</div>}
              </form>
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

