import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Cart from '../components/Cart';

const AboutUs = () => {

    const [hoveredCard, setHoveredCard] = useState(null);
    const [isHoveringButton, setIsHoveringButton] = useState(false);

    const [isTablet, setIsTablet] = useState(window.innerWidth <= 900);

    const {
        openCart,
        setOpenCart,
    } = useAppContext();

    useEffect(() => {
        setOpenCart(false);

        const handleResize = () => {
            setIsTablet(window.innerWidth <= 1144);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={styles.container}>
            <ContentContainer $opencart={openCart} $istablet={isTablet}>
                <div style={styles.decorativeShape1}></div>
                <div style={styles.decorativeShape2}></div>

                <div style={styles.header}>
                    <h1 style={styles.title}>Sobre Nosotros</h1>
                    <div style={styles.titleUnderline}></div>
                </div>

                <ContentWrapper $opencart={openCart} $istablet={isTablet}>
                    <div style={styles.contentCard}>

                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ ...styles.sectionTitle, position: 'relative' }}>
                                <span style={styles.sectionTitleBefore}></span>
                                Nuestra Historia
                            </h2>
                            <p style={styles.paragraph}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sit vero quis repellendus iste error nemo minima facere odio esse ipsum dolorem harum placeat totam officiis porro dolore, minus repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ut beatae explicabo. Quod veniam possimus doloribus quo vero dolorem eos quia, pariatur, amet aspernatur ratione dolores asperiores expedita repellat voluptatem.
                            </p>
                        </div>

                        <div style={styles.highlightSection}>
                            <h2 style={styles.sectionTitle}>Nuestra Misión</h2>
                            <p style={styles.paragraph}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sit vero quis repellendus iste error nemo minima facere odio esse ipsum dolorem harum placeat totam officiis porro dolore, minus repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ut beatae explicabo. Quod veniam possimus doloribus quo vero dolorem eos quia, pariatur, amet aspernatur ratione dolores asperiores expedita repellat voluptatem.
                            </p>
                        </div>

                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ ...styles.sectionTitle, textAlign: 'right', paddingRight: '20px', paddingLeft: '0' }}>
                                Nuestra Visión
                                <span style={{ ...styles.sectionTitleBefore, left: 'auto', right: '0' }}></span>
                            </h2>
                            <p style={styles.paragraph}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sit vero quis repellendus iste error nemo minima facere odio esse ipsum dolorem harum placeat totam officiis porro dolore, minus repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ut beatae explicabo. Quod veniam possimus doloribus quo vero dolorem eos quia, pariatur, amet aspernatur ratione dolores asperiores expedita repellat voluptatem.
                            </p>
                        </div>

                        <div style={styles.cardsContainer}>
                            <div
                                style={{
                                    ...styles.card,
                                    ...(hoveredCard === 'innovation' ? styles.cardHover : {})
                                }}
                                onMouseEnter={() => setHoveredCard('innovation')}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={styles.cardIcon}>⚡</div>
                                <h3 style={styles.cardTitle}>Innovación</h3>
                                <p style={styles.cardText}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quaerat, enim quibusdam sit maiores iure ratione adipisci ad eligendi dicta doloribus numquam rerum sint.
                                </p>
                            </div>

                            <div
                                style={{
                                    ...styles.card,
                                    ...(hoveredCard === 'commitment' ? styles.cardHover : {})
                                }}
                                onMouseEnter={() => setHoveredCard('commitment')}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={styles.cardIcon}>👥</div>
                                <h3 style={styles.cardTitle}>Compromiso</h3>
                                <p style={styles.cardText}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum alias illo, doloremque dolore quisquam ipsa laborum esse veritatis dignissimos cumque.
                                </p>
                            </div>
                        </div>

                        <div style={styles.ctaContainer}>
                            <a
                                href="https://www.linkedin.com/in/lucia-caranfa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://www.linkedin.com/in/lucia-caranfa/', '_blank', 'noopener,noreferrer');
                                }}
                                style={{
                                    ...styles.ctaButton,
                                    transform: isHoveringButton ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: isHoveringButton ? '0 15px 35px rgba(102, 126, 234, 0.4)' : '0 10px 25px rgba(102, 126, 234, 0.3)'
                                }}
                                onMouseEnter={() => setIsHoveringButton(true)}
                                onMouseLeave={() => setIsHoveringButton(false)}
                            >
                                <span>Conoce más sobre nosotros</span>
                                <span style={{
                                    ...styles.arrow,
                                    transform: isHoveringButton ? 'translateX(5px)' : 'translateX(0px)'
                                }}>→</span>
                            </a>
                        </div>
                    </div>
                </ContentWrapper>
            </ContentContainer>
            {openCart && (
                <CartWrapper $opencart={openCart} $istablet={isTablet}>
                    <Cart />
                </CartWrapper>
            )}
        </div>
    );
};

const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center'
        },
        decorativeShape1: {
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 1
        },
        decorativeShape2: {
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: 1
        },
        header: {
            textAlign: 'center',
            padding: '80px 20px 40px',
            position: 'relative',
            zIndex: 2
        },
        title: {
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        titleUnderline: {
            width: '80px',
            height: '4px',
            background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
            margin: '0 auto',
            borderRadius: '2px'
        },
        contentWrapper: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 20px 80px',
            position: 'relative',
            zIndex: 2
        },
        contentCard: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: 'clamp(30px, 5vw, 60px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        sectionTitle: {
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '20px',
            position: 'relative',
            paddingLeft: '20px'
        },
        sectionTitleBefore: {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '0',
            width: '4px',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '2px'
        },
        paragraph: {
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#4a5568',
            marginBottom: '40px',
            textAlign: 'justify'
        },
        highlightSection: {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            padding: '30px',
            borderRadius: '16px',
            marginBottom: '40px'
        },
        cardsContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
        },
        card: {
            background: '#ffffff',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
        },
        cardIcon: {
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '24px'
        },
        cardTitle: {
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '15px'
        },
        cardText: {
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#718096'
        },
        ctaContainer: {
            textAlign: 'center',
            marginTop: '50px'
        },
        ctaButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
        },
        arrow: {
            fontSize: '18px',
            transition: 'transform 0.3s ease'
        },
    };

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CartWrapper = styled.div`
  width: ${({ $opencart, $istablet }) => ($opencart ? ($istablet ? '100%' : '38%') : '0%')};
  height: 30%;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${({ $opencart }) => $opencart ? slideIn : 'none'} 0.8s ease;
  position: relative;
  margin: 40px 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #667eea);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
    border-radius: 24px 24px 0 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 28px 80px rgba(0, 0, 0, 0.15),
      0 12px 40px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 1145px) {
    width: ${({ $opencart }) => ($opencart ? '100%' : '0%')} !important;
    max-width: 800px;
    margin: 40px 20px;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const ContentContainer = styled.div`
  width: ${({ $opencart, $istablet }) => ($opencart ? ($istablet ? '0%' : '60%') : '100%')};
  display: ${({ $opencart, $istablet }) => ($opencart && $istablet ? 'none' : 'block')};
  opacity: ${({ $opencart, $istablet }) => ($opencart && $istablet ? '0' : '1')};
  height: ${({ $opencart, $istablet }) => ($opencart && $istablet ? '0' : 'auto')};
  overflow: hidden;
  transition: all 0.4s ease;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 40px;
  transition: all 0.5s ease;
  display: ${({ $opencart, $istablet }) => ($opencart && $istablet ? 'none' : 'block')};
`;

export default AboutUs;