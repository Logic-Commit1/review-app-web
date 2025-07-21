import React from 'react';
import {
    IonModal,
    IonButton,
    IonIcon,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
} from '@ionic/react';
import {
    logoFacebook,
    heart
} from 'ionicons/icons';
import './FacebookReviewModal.css';

interface FacebookReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    businessName: string;
    facebookUrl: string;
    rating: number;
}

const FacebookReviewModal: React.FC<FacebookReviewModalProps> = ({
    isOpen,
    onClose,
    facebookUrl,
}) => {
    const handleFacebookRedirect = () => {
        // Process Facebook URL to ensure it goes to reviews page
        const reviewUrl = processFacebookUrl(facebookUrl);
        window.open(reviewUrl, '_blank', 'noopener,noreferrer');
        onClose();
    };

    const processFacebookUrl = (url: string): string => {
        // Remove trailing slash if present
        let processedUrl = url.replace(/\/$/, '');

        // If URL doesn't end with /reviews, add it
        if (!processedUrl.endsWith('/reviews')) {
            processedUrl += '/reviews';
        }

        return processedUrl;
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className="facebook-modal">
            <div className="modal-content">
                <div className="modal-body">
                    <IonCard className="main-card">
                        <IonCardHeader className="card-header">
                            <div className="business-info">
                                <IonIcon icon={heart} className="heart-icon" style={{ color: "#25b1dd" }} />
                                <IonCardTitle className="business-title">
                                    Thank you for your review!
                                </IonCardTitle>
                            </div>
                        </IonCardHeader>

                        <IonCardContent className="card-content">
                            <div className="message-section">
                                <IonText className="main-message">
                                    Your review has been submitted.
                                    Would you also like to share your experience on our Facebook page?
                                </IonText>
                            </div>

                            <div className="action-buttons">
                                <IonButton
                                    expand="block"
                                    size="large"
                                    className="facebook-button"
                                    onClick={handleFacebookRedirect}
                                >
                                    <IonIcon icon={logoFacebook} slot="start" style={{ paddingRight: "6px" }} />
                                    Go to Facebook Page
                                    {/* <IonIcon  icon={arrowForward} slot="end" /> */}
                                </IonButton>

                                <IonButton
                                    fill="clear"
                                    size="large"
                                    className="later-button"
                                    onClick={onClose}
                                >
                                    Maybe Later
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </div>
            </div>
        </IonModal>
    );
};

export default FacebookReviewModal; 