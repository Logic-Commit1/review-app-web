import { IonContent, IonHeader, IonPage, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { star, people, trendingUp, shieldCheckmark, chatbubbleEllipses, analytics } from 'ionicons/icons';
import './Home.css';
import Logo from '@/components/common/logo/Logo';


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="landing-header">
        <div className="header-content">
          <div className="header-logo">
            <Logo />
            <p className="header-logo-text">Review Pro</p>
          </div>
          <div className="header-actions">
            <IonButton fill="clear" className="header-btn">Login</IonButton>
            <IonButton className="header-btn primary">Get Started</IonButton>
          </div>
        </div>
      </IonHeader>

      <IonContent fullscreen className="landing-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Turn Your Customers Into
              <span className="highlight"> Brand Advocates</span>
            </h1>
            <p className="hero-subtitle">
              Collect authentic customer reviews effortlessly and boost your business reputation.
              Simple, powerful, and trusted by thousands of businesses.
            </p>
            <div className="hero-actions">
              <IonButton size="large" className="cta-button">
                Start Collecting Reviews
              </IonButton>
              <IonButton fill="clear" size="large" className="demo-button">
                Watch Demo
              </IonButton>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <IonIcon icon={people} />
                <span>10,000+ Businesses</span>
              </div>
              <div className="stat-item">
                <IonIcon icon={star} />
                <span>1M+ Reviews Collected</span>
              </div>
              <div className="stat-item">
                <IonIcon icon={trendingUp} />
                <span>95% Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose ReviewFlow?</h2>
            <p>Everything you need to build trust and grow your business through customer reviews</p>
          </div>

          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardHeader>
                    <IonIcon icon={chatbubbleEllipses} className="feature-icon" />
                    <IonCardTitle>Easy Review Collection</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Send personalized review requests to your customers with just a few clicks.
                    Our smart system ensures high response rates.
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardHeader>
                    <IonIcon icon={analytics} className="feature-icon" />
                    <IonCardTitle>Powerful Analytics</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Track your review performance, monitor sentiment, and get insights to improve
                    your customer experience.
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="4">
                <IonCard className="feature-card">
                  <IonCardHeader>
                    <IonIcon icon={shieldCheckmark} className="feature-icon" />
                    <IonCardTitle>Trusted & Secure</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    Your data is protected with enterprise-grade security. We're GDPR compliant
                    and prioritize your privacy.
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join thousands of businesses already using ReviewFlow to build trust and grow their customer base.</p>
            <IonButton size="large" className="cta-button">
              Start Your Free Trial
            </IonButton>
            <p className="cta-note">No credit card required • 14-day free trial</p>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
