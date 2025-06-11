/* import React, { useState } from 'react'

const LoginModal = ({
  showModal,
  isLoggedIn,
  setIsLoggedIn,
  setShowModal,
  isAdminLoggedIn,
  setIsAdminLoggedIn
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

 const handleLogin = async (e) => {
  e.preventDefault();

  const newErrors = {
    user: user.trim() === '',
    password: password.trim() === ''
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some((val) => val);
  if (hasErrors) return;

  try {
    const response = await fetch('./data/users.json');
    if (!response.ok) throw new Error('Error al cargar los usuarios');

    const fetchedUsers = await response.json();

    const userFound = fetchedUsers.find(
      (u) => u.userName === user && u.password === password
    );

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
  }
};

  if ((!isLoggedIn || !isAdminLoggedIn) && showModal) {
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
 */


import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #1e1e1e;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  color: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${props => props.error ? '#ff4d4f' : '#ccc'};
  margin-bottom: 8px;
  background-color: #2a2a2a;
  color: white;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4ca996;
    box-shadow: 0 0 0 2px rgba(76, 169, 150, 0.3);
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  text-align: left;
  margin-bottom: 10px;
`;

const GeneralError = styled.div`
  background-color: #ffdddd;
  color: #a80000;
  border: 1px solid #a80000;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;

  ${props => props.variant === 'cancel' && `
    background-color: #3a3a3a;
    color: #aaa;
    border: 1px solid #888;

    &:hover {
      background-color: #555;
    }
  `}

  ${props => props.variant === 'confirm' && `
    background-color: #4ca996;
    color: white;

    &:hover {
      background-color: #3a8678;
    }
  `}
`;

const LoginModal = ({
  showModal,
  isLoggedIn,
  setIsLoggedIn,
  setShowModal,
  isAdminLoggedIn,
  setIsAdminLoggedIn
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

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {
      user: user.trim() === '',
      password: password.trim() === ''
    };

    setErrors(prev => ({ ...prev, ...newErrors }));

    if (newErrors.user || newErrors.password) return;

    try {
      const response = await fetch('./data/users.json');
      if (!response.ok) throw new Error('Error al cargar los usuarios');
      const fetchedUsers = await response.json();

      const userFound = fetchedUsers.find(
        (u) => u.userName === user && u.password === password
      );

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
    }
  };

  if ((!isLoggedIn || !isAdminLoggedIn) && showModal) {
    return (
      <Overlay>
        <Modal>
          <Title>Iniciar sesión</Title>

          {errors.message && <GeneralError>{errors.message}</GeneralError>}

          <form onSubmit={handleLogin}>
            <div>
              <Input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Nombre de usuario"
                error={errors.user}
              />
              {errors.user && <ErrorText>Este campo es requerido</ErrorText>}
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                error={errors.password}
              />
              {errors.password && <ErrorText>Este campo es requerido</ErrorText>}
            </div>
            <ButtonRow>
              <Button type="button" variant="cancel" onClick={handleClose}>Cerrar</Button>
              <Button type="submit" variant="confirm">Ingresar</Button>
            </ButtonRow>
          </form>
        </Modal>
      </Overlay>
    );
  }

  return null;
};

export default LoginModal;