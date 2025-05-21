import React, { useState } from 'react'

const LoginModal = ({
    showModal,
    isLoggedIn,
    setIsLoggedIn,
    setShowModal,
    users
}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ user: false, password: false, message: '' });
  
    const handleClose = () => {
      setShowModal(false);
      setUser('');
      setPassword('');
      setErrors({ user: false, password: false, message: '' });
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      const newErrors = {
        user: user.trim() === '',
        password: password.trim() === ''
      };
  
      setErrors(newErrors);
  
      const hasErrors = Object.values(newErrors).some((val) => val);
      if (hasErrors) return;
  
      const userFound = users.find((u) => u.userName === user && u.password === password);
      if (userFound) {
            setIsLoggedIn(true);
        
        localStorage.setItem('isLoggedIn', 'true');
        handleClose();
      } else {
        setErrors({ user: false, password: false, message: 'Usuario o contraseña incorrectos' });
      }
    };
  
    if (!isLoggedIn && showModal) {
      return (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div>
              <h2 style={{ textAlign: 'center', color: "#888", marginBottom: "10px" }}>Iniciar sesión</h2>
            </div>
          {errors.message && (
            <div style={generalErrorStyle}>
              {errors.message}
            </div>
          )}
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Nombre de usuario"
                  style={{
                    ...inputStyle,
                    borderColor: errors.user ? 'red' : '#ccc'
                  }}
                />
                {errors.user && <div style={errorTextStyle}>Este campo es requerido</div>}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  style={{
                    ...inputStyle,
                    borderColor: errors.password ? 'red' : '#ccc'
                  }}
                />
                {errors.password && <div style={errorTextStyle}>Este campo es requerido</div>}
              </div>
              <button style={closeButtonStyle} type="button" onClick={handleClose}>Cerrar</button>
              <button style={confirmButtonStyle} type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };
  
  const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px'
  };
  
  const inputStyle = {
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };
  
  const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
    textAlign: 'left'
  };

  const generalErrorStyle = {
    marginTop: '15px',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#ffe6e6',
    color: '#cc0000',           
    border: '1px solid #cc0000',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const confirmButtonStyle = {
    backgroundColor: "#4ca996",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "14px",
    marginLeft: '10px',
  }

  const closeButtonStyle = {
    backgroundColor: "#ededed",
    color: "#888",
    padding: "10px 20px",
    border: "1px solid #888",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "14px",
  }

  export default LoginModal;
