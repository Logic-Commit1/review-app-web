import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
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
    star,
    close,
    arrowForward,
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
    businessName,
    facebookUrl,
    rating
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

    const renderStars = (count: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <IonIcon
                key={index}
                icon={star}
                color={index < count ? 'warning' : 'medium'}
                className="rating-star"
            />
        ));
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className="facebook-modal">
            <IonHeader className="modal-header">
                <IonToolbar>
                    <IonTitle>Help {businessName} Grow!</IonTitle>
                    <IonButton
                        fill="clear"
                        slot="end"
                        onClick={onClose}
                        className="close-button"
                    >
                        <IonIcon icon={close} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <div className="modal-content">
                <div className="modal-body">
                    <IonCard className="main-card">
                        <IonCardHeader className="card-header">
                            <div className="business-info">
                                <IonIcon icon={heart} className="heart-icon" />
                                <IonCardTitle className="business-title">
                                    Thank you for your {rating}-star review!
                                </IonCardTitle>
                            </div>
                            <div className="rating-display">
                                {renderStars(rating)}
                            </div>
                        </IonCardHeader>

                        <IonCardContent className="card-content">
                            <div className="message-section">
                                <IonText className="main-message">
                                    Your review helps {businessName} a lot!
                                    Would you also like to share your experience on Facebook?
                                </IonText>

                                <div className="benefits">
                                    <div className="benefit-item">
                                        <IonIcon icon={logoFacebook} className="benefit-icon" />
                                        <span>Reach more potential customers</span>
                                    </div>
                                    <div className="benefit-item">
                                        <IonIcon icon={star} className="benefit-icon" />
                                        <span>Boost their online reputation</span>
                                    </div>
                                    <div className="benefit-item">
                                        <IonIcon icon={heart} className="benefit-icon" />
                                        <span>Show your support for local business</span>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <IonButton
                                    expand="block"
                                    size="large"
                                    className="facebook-button"
                                    onClick={handleFacebookRedirect}
                                >
                                    <IonIcon icon={logoFacebook} slot="start" />
                                    Leave Facebook Review
                                    <IonIcon icon={arrowForward} slot="end" />
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