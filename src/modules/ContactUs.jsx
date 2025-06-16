import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Cart from '../components/Cart';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert(`Formulario enviado por: ${formData.nombre}\nEmail: ${formData.email}`);
        setIsSubmitting(false);

        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            asunto: '',
            mensaje: ''
        });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            padding: '40px 20px',
            display: 'flex',
            justifyContent: 'space-between',
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
        title: {
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '15px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '20px'
        },
        titleUnderline: {
            width: '80px',
            height: '4px',
            background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
            margin: '0 auto',
            borderRadius: '2px'
        },
        formContainer: {
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 2
        },
        formCard: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '24px',
            padding: 'clamp(30px, 5vw, 50px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        form: {
            display: 'grid',
            gap: '25px'
        },
        inputGroup: {
            position: 'relative'
        },
        inputRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
        },
        label: {
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#4a5568',
            marginBottom: '8px',
            transition: 'color 0.3s ease'
        },
        input: {
            width: '100%',
            padding: '15px 20px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            background: '#ffffff',
            color: '#2d3748',
            transition: 'all 0.3s ease',
            outline: 'none',
            boxSizing: 'border-box'
        },
        inputFocused: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            transform: 'translateY(-2px)'
        },
        textarea: {
            width: '100%',
            padding: '15px 20px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            background: '#ffffff',
            color: '#2d3748',
            transition: 'all 0.3s ease',
            outline: 'none',
            resize: 'vertical',
            minHeight: '120px',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
        },
        select: {
            width: '100%',
            padding: '15px 20px',
            fontSize: '1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            background: '#ffffff',
            color: '#2d3748',
            transition: 'all 0.3s ease',
            outline: 'none',
            cursor: 'pointer',
            boxSizing: 'border-box'
        },
        submitButton: {
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '18px 40px',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '160px'
        },
        submitButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
        },
        submitButtonDisabled: {
            opacity: '0.7',
            cursor: 'not-allowed',
            transform: 'none'
        },
        loader: {
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        contactInfo: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px',
            padding: '30px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
        },
        contactItem: {
            textAlign: 'center',
            padding: '15px',
            transition: 'transform 0.3s ease, background-color 0.3s ease',
            borderRadius: '12px',
            cursor: 'pointer'
        },
        contactItemHover: {
            transform: 'translateY(-5px)',
            background: 'rgba(255, 255, 255, 0.1)'
        },
        contactIcon: {
            fontSize: '2rem',
            marginBottom: '10px',
            color: '#667eea'
        },
        contactTitle: {
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '5px'
        },
        contactText: {
            fontSize: '0.95rem',
            color: '#718096',
            textDecoration: 'none'
        },
        contactLink: {
            textDecoration: 'none',
            color: 'inherit',
            display: 'block'
        }
    };

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    const handleContactItemHover = (e, isHover) => {
        if (isHover) {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        } else {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'transparent';
        }
    };

    return (
        <div style={styles.container}>
            <ContentContainer $opencart={openCart} $istablet={isTablet}>
                <div style={styles.decorativeShape1}></div>
                <div style={styles.decorativeShape2}></div>
                <h1 style={styles.title}>Contáctanos</h1>
                <p style={styles.subtitle}>Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.</p>
                <div style={styles.titleUnderline}></div>


                <div style={styles.formContainer}>
                    <div style={styles.formCard}>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputRow}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Nombre completo *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('nombre')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Tu nombre completo"
                                        required
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'nombre' ? styles.inputFocused : {})
                                        }}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="tu@email.com"
                                        required
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'email' ? styles.inputFocused : {})
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={styles.inputRow}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('telefono')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="+54 11 1234-5678"
                                        style={{
                                            ...styles.input,
                                            ...(focusedField === 'telefono' ? styles.inputFocused : {})
                                        }}
                                    />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Asunto *</label>
                                    <select
                                        name="asunto"
                                        value={formData.asunto}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedField('asunto')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                        style={{
                                            ...styles.select,
                                            ...(focusedField === 'asunto' ? styles.inputFocused : {})
                                        }}
                                    >
                                        <option value="">Selecciona un asunto</option>
                                        <option value="consulta">Consulta general</option>
                                        <option value="soporte">Soporte técnico</option>
                                        <option value="ventas">Información de ventas</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Mensaje *</label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('mensaje')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Escribe tu mensaje aquí..."
                                    required
                                    style={{
                                        ...styles.textarea,
                                        ...(focusedField === 'mensaje' ? styles.inputFocused : {})
                                    }}
                                />
                            </div>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        ...styles.submitButton,
                                        ...(isSubmitting ? styles.submitButtonDisabled : {}),
                                        ...(!isSubmitting ? styles.submitButtonHover : {})
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting) {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                                        }
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span style={styles.loader}></span>
                                            <span style={{ marginLeft: '10px' }}>Enviando...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Enviar Mensaje</span>
                                            <span style={{ marginLeft: '8px' }}>✉️</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div style={styles.contactInfo}>
                            <div
                                style={styles.contactItem}
                                onMouseEnter={(e) => handleContactItemHover(e, true)}
                                onMouseLeave={(e) => handleContactItemHover(e, false)}
                            >
                                <a href="mailto:luciacaranfa@gmail.com" style={styles.contactLink}>
                                    <div style={styles.contactIcon}>📧</div>
                                    <div style={styles.contactTitle}>Email</div>
                                    <div style={styles.contactText}>luciacaranfa@gmail.com</div>
                                </a>
                            </div>

                            <div
                                style={styles.contactItem}
                                onMouseEnter={(e) => handleContactItemHover(e, true)}
                                onMouseLeave={(e) => handleContactItemHover(e, false)}
                            >
                                <a href="tel:+541112345678" style={styles.contactLink}>
                                    <div style={styles.contactIcon}>📞</div>
                                    <div style={styles.contactTitle}>Teléfono</div>
                                    <div style={styles.contactText}>+54 11 1234-5678</div>
                                </a>
                            </div>

                            <div
                                style={styles.contactItem}
                                onMouseEnter={(e) => handleContactItemHover(e, true)}
                                onMouseLeave={(e) => handleContactItemHover(e, false)}
                            >
                                <a
                                    href="https://maps.google.com/?q=Buenos+Aires,+Argentina"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.contactLink}
                                >
                                    <div style={styles.contactIcon}>📍</div>
                                    <div style={styles.contactTitle}>Dirección</div>
                                    <div style={styles.contactText}>Capital Federal, Buenos Aires, Argentina</div>
                                </a>
                            </div>

                            <div
                                style={styles.contactItem}
                                onMouseEnter={(e) => handleContactItemHover(e, true)}
                                onMouseLeave={(e) => handleContactItemHover(e, false)}
                            >
                                <a
                                    href="https://www.linkedin.com/in/lucia-caranfa/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.contactLink}
                                >
                                    <div style={styles.contactIcon}>💼</div>
                                    <div style={styles.contactTitle}>LinkedIn</div>
                                    <div style={styles.contactText}>Contactame y trabajemos juntos</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
            {openCart && (
                <CartWrapper $opencart={openCart} $istablet={isTablet}>
                    <Cart />
                </CartWrapper>
            )}
        </div>
    );
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
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
  transition: all 0.5s ease;
  width: ${({ $opencart, $istablet }) => ($opencart ? ($istablet ? '0%' : '40%') : '100%')};
  display: ${({ $opencart, $istablet }) => ($opencart && $istablet ? 'none' : 'block')};
  opacity: ${({ $opencart, $istablet }) => ($opencart && $istablet ? '0' : '1')};
  height: ${({ $opencart, $istablet }) => ($opencart && $istablet ? '0' : 'auto')};
  overflow: hidden;
  transition: all 0.4s ease;
`;

export default ContactUs;