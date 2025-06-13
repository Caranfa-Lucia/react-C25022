import React from 'react';
import { Github, Linkedin, Mail, Heart, Code, Calendar } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Caranfa-Lucia', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/lucia-caranfa/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:luciacaranfa@gmail.com?subject=Contacto desde Mi Aplicación React&body=Hola Lucía,%0D%0A%0D%0AMe gustaría ponerme en contacto contigo...', label: 'Email' }
  ];

  const styles = {
    footer: {
      position: 'relative',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      backgroundSize: '200% 200%',
      color: 'white',
      overflow: 'hidden',
      minHeight: '300px',
      animation: 'gradientShift 8s ease infinite'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      pointerEvents: 'none'
    },
    floatingElement1: {
      position: 'absolute',
      top: '10%',
      left: '25%',
      width: '200px',
      height: '200px',
      background: 'rgba(168, 85, 247, 0.3)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite'
    },
    floatingElement2: {
      position: 'absolute',
      bottom: '10%',
      right: '25%',
      width: '150px',
      height: '150px',
      background: 'rgba(236, 72, 153, 0.3)',
      borderRadius: '50%',
      filter: 'blur(60px)',
      animation: 'float 6s ease-in-out infinite 3s'
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '32px',
      marginBottom: '32px'
    },
    gridMd: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px',
      marginBottom: '32px'
    },
    section: {
      textAlign: 'center'
    },
    sectionLeft: {
      textAlign: 'left'
    },
    sectionRight: {
      textAlign: 'right'
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    brandContainerLeft: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '16px'
    },
    brandIcon: {
      background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    brandText: {
      marginLeft: '12px',
      fontSize: '20px',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #a855f7, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    description: {
      color: '#cbd5e1',
      fontSize: '14px',
      lineHeight: '1.6',
      margin: 0
    },
    sectionTitle: {
      fontWeight: '600',
      fontSize: '18px',
      marginBottom: '16px',
      color: '#c084fc'
    },
    developerInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    developerName: {
      color: '#cbd5e1',
      margin: 0
    },
    developerNameSpan: {
      fontWeight: '500',
      color: 'white'
    },
    commissionInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      color: '#9ca3af',
      gap: '8px'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px'
    },
    socialLinksRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '16px'
    },
    socialLink: {
      position: 'relative',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#cbd5e1'
    },
    divider: {
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '24px'
    },
    bottomSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#9ca3af',
      gap: '16px'
    },
    bottomSectionMd: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#9ca3af',
      gap: 0
    },
    copyright: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    madeWith: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    animatedBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)',
      backgroundSize: '200% 100%',
      animation: 'gradientShift 3s ease infinite'
    }
  };

  // Estado para detectar tamaño de pantalla
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBrandHover = (e, isHover) => {
    if (isHover) {
      e.target.closest('div').style.transform = 'scale(1.1)';
    } else {
      e.target.closest('div').style.transform = 'scale(1)';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .heart-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
        `}
      </style>

      <footer style={styles.footer}>
        <div style={styles.backgroundPattern}>
          <div style={styles.floatingElement1}></div>
          <div style={styles.floatingElement2}></div>
        </div>

        <div style={styles.contentWrapper}>
          <div style={isMobile ? styles.grid : styles.gridMd}>

            <div style={styles.section}>
              <div style={isMobile ? styles.brandContainer : styles.brandContainerLeft}>
                <div
                  style={styles.brandIcon}
                  onMouseEnter={(e) => handleBrandHover(e, true)}
                  onMouseLeave={(e) => handleBrandHover(e, false)}
                >
                  <Code size={24} />
                </div>
                <span style={styles.brandText}>Mi Aplicación React</span>
              </div>
              <p style={styles.description}>
                Desarrollado con pasión y dedicación. El siguiente ecommerce es un proyecto utilizado como entrega final para el curso de React JS - Talento Tech.
              </p>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Desarrollador</h3>
              <div style={styles.developerInfo}>
                <p style={styles.developerName}>
                  <span style={styles.developerNameSpan}>Caranfa Lucía Paula Denise</span>
                </p>
                <div style={styles.commissionInfo}>
                  <Calendar size={16} />
                  <span>Comisión 25022</span>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Conecta</h3>
              <div style={isMobile ? styles.socialLinks : styles.socialLinksRight}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target={social.icon === Mail ? '_self' : '_blank'}
                      rel={social.icon === Mail ? '' : 'noopener noreferrer'}
                      aria-label={social.label}
                      style={styles.socialLink}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={styles.divider}></div>

          <div style={isMobile ? styles.bottomSection : styles.bottomSectionMd}>
            <div style={styles.copyright}>
              <span>&copy; {currentYear} Mi Aplicación React.</span>
              <span>Todos los derechos reservados.</span>
            </div>

            <div style={styles.madeWith}>
              <span>Hecho con</span>
              <Heart size={16} className="heart-pulse" style={{ color: '#ef4444' }} />
              <span>y React</span>
            </div>
          </div>
        </div>

        <div style={styles.animatedBorder}></div>
      </footer>
    </>
  );
}

export default Footer;