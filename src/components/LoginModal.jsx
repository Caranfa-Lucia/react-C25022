
import React, { useState, useEffect } from 'react';

const LoginModal = ({
  showModal = false,
  isLoggedIn = false,
  setIsLoggedIn = () => { },
  setShowModal = () => { },
  isAdminLoggedIn = false,
  setIsAdminLoggedIn = () => { }
}) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ user: false, password: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [showModal]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowModal(false);
      setUser('');
      setPassword('');
      setErrors({ user: false, password: false, message: '' });
    }, 300);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {
      user: user.trim() === '',
      password: password.trim() === ''
    };

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (newErrors.user || newErrors.password) {
      setIsLoading(false);
      return;
    }

    try {
      await delay(1500);
      const response = await fetch('./data/users.json');
      if (!response.ok) throw new Error('Error al cargar los usuarios');
      const fetchedUsers = await response.json();

      const userFound = fetchedUsers.find(
        (u) => u.userName === user && u.password === password
      )

      if (userFound) {
        if (userFound.userName === "admin") {
          setIsAdminLoggedIn(true);
          setIsLoggedIn(false);
          localStorage.setItem('isAdminLoggedIn', 'true');
          localStorage.removeItem('isLoggedIn');
        } else {
          setIsLoggedIn(true);
          setIsAdminLoggedIn(false);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.removeItem('isAdminLoggedIn');
        }
        handleClose();
      } else {
        setErrors({ user: false, password: false, message: 'Usuario o contraseña incorrectos' });
      }
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setErrors({ user: false, password: false, message: 'Error del servidor. Intenta más tarde.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: false, message: '' }));
  };

  if ((!isLoggedIn || !isAdminLoggedIn) && showModal) {
    return (
      <div style={dynamicStyles.overlay(isVisible)} onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div style={dynamicStyles.modal(isVisible)}>
          <div style={styles.modalGlow}></div>
          <div style={styles.floatingElements}>
            <div style={styles.floatingCircle1}></div>
            <div style={styles.floatingCircle2}></div>
          </div>

          <div style={styles.header}>
            <h2 style={styles.title}>Bienvenido</h2>
            <p style={styles.subtitle}>Inicia sesión para continuar</p>
          </div>

          {errors.message && (
            <div style={styles.generalError}>
              <span>⚠️</span>
              {errors.message}
            </div>
          )}

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>👤</div>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  onFocus={() => handleInputFocus('user')}
                  placeholder="Nombre de usuario"
                  style={{
                    ...styles.input,
                    ...(errors.user ? styles.inputError : {}),
                    paddingLeft: '50px'
                  }}
                  onMouseEnter={(e) => {
                    if (!errors.user) {
                      Object.assign(e.target.style, styles.inputFocused);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target && !errors.user) {
                      e.target.style.borderColor = 'transparent';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                />
              </div>
              {errors.user && (
                <div style={styles.errorText}>
                  <span>❌</span>
                  Este campo es requerido
                </div>
              )}
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <div style={styles.inputIcon}>🔒</div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleInputFocus('password')}
                  placeholder="Contraseña"
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                    paddingLeft: '50px'
                  }}
                  onMouseEnter={(e) => {
                    if (!errors.password) {
                      Object.assign(e.target.style, styles.inputFocused);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (document.activeElement !== e.target && !errors.password) {
                      e.target.style.borderColor = 'transparent';
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <div style={styles.errorText}>
                  <span>❌</span>
                  Este campo es requerido
                </div>
              )}
            </div>

            <div style={styles.buttonRow}>
              <button
                type="button"
                style={{ ...styles.button, ...styles.cancelButton }}
                onClick={handleClose}
                disabled={isLoading}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.cancelButtonHover)}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                style={{ ...styles.button, ...styles.confirmButton }}
                onClick={handleLogin}
                disabled={isLoading}
                onMouseEnter={(e) => !isLoading && Object.assign(e.target.style, styles.confirmButtonHover)}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #4ca996 0%, #3a8678 100%)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 20px rgba(76, 169, 150, 0.3)';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div style={styles.loadingSpinner}></div>
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar
                    <span style={{ marginLeft: '8px' }}>🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const dynamicStyles = {
  overlay: (isVisible) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '20px'
  }),
  modal: (isVisible) => ({
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '40px',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '420px',
    color: 'white',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden'
  })
}

const styles = {
  modalGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(76, 169, 150, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    position: 'relative',
    zIndex: 2
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #4ca996 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '400'
  },
  form: {
    position: 'relative',
    zIndex: 2
  },
  inputGroup: {
    marginBottom: '24px',
    position: 'relative'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: '16px 50px 16px 20px',
    borderRadius: '12px',
    border: '2px solid transparent',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  inputFocused: {
    borderColor: '#4ca996',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 0 0 4px rgba(76, 169, 150, 0.2)',
    transform: 'translateY(-2px)'
  },
  inputError: {
    borderColor: '#ff6b6b',
    background: 'rgba(255, 107, 107, 0.1)',
    boxShadow: '0 0 0 4px rgba(255, 107, 107, 0.2)'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.6)',
    pointerEvents: 'none'
  },
  passwordToggle: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '4px',
    borderRadius: '4px',
    transition: 'color 0.3s ease'
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: '14px',
    marginTop: '8px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  generalError: {
    background: 'rgba(255, 107, 107, 0.1)',
    color: '#ff6b6b',
    border: '1px solid rgba(255, 107, 107, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  buttonRow: {
    display: 'flex',
    gap: '16px',
    marginTop: '32px'
  },
  button: {
    flex: 1,
    padding: '16px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cancelButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(255, 255, 255, 0.2)'
  },
  cancelButtonHover: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    transform: 'translateY(-2px)'
  },
  confirmButton: {
    background: 'linear-gradient(135deg, #4ca996 0%, #3a8678 100%)',
    color: 'white',
    boxShadow: '0 8px 20px rgba(76, 169, 150, 0.3)'
  },
  confirmButtonHover: {
    background: 'linear-gradient(135deg, #3a8678 0%, #2d6b5f 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 25px rgba(76, 169, 150, 0.4)'
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden'
  },
  floatingCircle1: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '100px',
    height: '100px',
    background: 'rgba(76, 169, 150, 0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  floatingCircle2: {
    position: 'absolute',
    bottom: '-30px',
    left: '-30px',
    width: '80px',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite reverse'
  }
};

export default LoginModal;