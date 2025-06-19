import React from 'react';
import { Code, Sparkles } from 'lucide-react';

function Header() {

    return (
        <>
            <style>{cssAnimations}</style>
            <header style={headerStyle}>
                <div style={containerStyle}>

                    <div style={iconContainerStyle}>
                        <div
                            style={iconWrapperStyle}
                            className="icon-wrapper"
                        >
                            <Code size={18} color="white" />
                            <div style={sparkleStyle}>
                                <Sparkles size={10} />
                            </div>
                        </div>
                    </div>

                    <h1 style={mainTitleStyle}>
                        Proyecto React - Ecommerce
                    </h1>

                    <div style={subtitleContainerStyle}>
                        <span
                            style={subtitlePillStyle}
                            className="subtitle-pill"
                        >
                            <span style={statusDotStyle}></span>
                            Caranfa Lucía Paula Denise - 25022
                        </span>
                    </div>

                    <div style={decorativeLineStyle}>
                        <div style={lineStyle}></div>
                    </div>
                </div>
            </header>
        </>
    );
}

 const headerStyle = {
        background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #3730a3 100%)',
        padding: '0.5rem 1rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
    };

    const iconContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.25rem',
        position: 'relative'
    };

    const iconWrapperStyle = {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50%',
        padding: '0.25rem',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const sparkleStyle = {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        color: '#fbbf24',
        animation: 'sparkle 2s ease-in-out infinite'
    };

    const mainTitleStyle = {
        fontSize: window.innerWidth >= 768 ? '1.25rem' : '1.125rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '0.125rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #e9d5ff 50%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        margin: 0
    };

    const subtitleContainerStyle = {
        color: '#c4b5fd',
        fontSize: window.innerWidth >= 768 ? '0.875rem' : '0.75rem'
    };

    const subtitlePillStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '9999px',
        padding: '0.375rem 1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };

    const statusDotStyle = {
        width: '0.5rem',
        height: '0.5rem',
        background: '#4ade80',
        borderRadius: '50%',
        animation: 'pulse 2s ease-in-out infinite'
    };

    const decorativeLineStyle = {
        marginTop: '0.25rem',
        display: 'flex',
        justifyContent: 'center'
    };

    const lineStyle = {
        width: '4rem',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
        borderRadius: '9999px'
    };

    const cssAnimations = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes sparkle {
      0%, 100% { 
        transform: scale(1) rotate(0deg); 
        opacity: 0.8; 
      }
      50% { 
        transform: scale(1.2) rotate(180deg); 
        opacity: 1; 
      }
    }
    
    .icon-wrapper:hover {
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.3) !important;
    }
    
    .subtitle-pill:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      transform: translateY(-2px);
    }
  `;

export default Header;