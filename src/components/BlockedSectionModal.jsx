/* import React from 'react'
import { useAppContext } from '../context/AppContext';
import stop from '../images/stop.png';

const BlockedSectionModal = () => {

  const {
    isLoggedIn,
    showBlockedModal,
    isAdminLoggedIn,
    showBlockedAdminModal,
    setShowBlockedModal,
    setShowBlockedAdminModal
  } = useAppContext();

  const blockedModalText = "Por favor, inicie sesión como cliente para ingresar a la sección del carrito y realizar el pago.";
  const blockedAdminModalText = "Por favor, inicie sesion como administrador para ingresar al panel de administracion.";

  const handleClose = () => {
    setShowBlockedModal(false);
    setShowBlockedAdminModal(false);
  };

  return (
    <div>
      {!isLoggedIn && showBlockedModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <img src={stop} alt="Stop" width="100px" height="100px" />
            <div style={modalText}>
              <p>{blockedModalText}</p>
            </div>
            <button
              style={buttonStyle}
              onClick={handleClose}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
      {!isAdminLoggedIn && showBlockedAdminModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <img src={stop} alt="Stop" width="100px" height="100px" />
            <div style={modalText}>
              <p>{blockedAdminModalText}</p>
            </div>
            <button
              style={buttonStyle}
              onClick={handleClose}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

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
  padding: '40px 25px',
  borderRadius: '8px',
  textAlign: 'center',
  width: '320px',
  height: '310px'
};

const modalText = {
  marginTop: '20px',
  marginBottom: '20px',
  fontSize: '14px'
};

const buttonStyle = {
  backgroundColor: '#4ca996',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '5px',
  fontSize: '14px'
};

export default BlockedSectionModal */

import React from 'react';
import { useAppContext } from '../context/AppContext';
import stop from '../images/stop.png';
import styled from 'styled-components'; // Using styled-components for modern styling

const BlockedSectionModal = () => {
  const {
    isLoggedIn,
    showBlockedModal,
    isAdminLoggedIn,
    showBlockedAdminModal,
    setShowBlockedModal,
    setShowBlockedAdminModal
  } = useAppContext();

  const blockedModalText = "Por favor, inicie sesión como cliente para ingresar a la sección del carrito y realizar el pago.";
  const blockedAdminModalText = "Por favor, inicie sesion como administrador para ingresar al panel de administracion.";

  const handleClose = () => {
    setShowBlockedModal(false);
    setShowBlockedAdminModal(false);
  };

  return (
    <>
      {!isLoggedIn && showBlockedModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalImage src={stop} alt="Stop" />
            <ModalText>
              <p>{blockedModalText}</p>
            </ModalText>
            <ModalButton onClick={handleClose}>
              Continuar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
      {!isAdminLoggedIn && showBlockedAdminModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalImage src={stop} alt="Stop" />
            <ModalText>
              <p>{blockedAdminModalText}</p>
            </ModalText>
            <ModalButton onClick={handleClose}>
              Continuar
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled Components for a modern look
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Slightly darker overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px; /* More rounded corners */
  text-align: center;
  width: 90%; /* Responsive width */
  max-width: 400px; /* Max width for larger screens */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* Softer, more prominent shadow */
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-20px); /* Slight animation on appearance */
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const ModalImage = styled.img`
  width: 80px; /* Slightly smaller icon */
  height: 80px;
  margin-bottom: 20px;
`;

const ModalText = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 16px; /* Slightly larger text */
  color: #333; /* Darker text for readability */
  line-height: 1.5; /* Improved line spacing */

  p {
    margin: 0;
  }
`;

const ModalButton = styled.button`
  background-color: #4ca996; /* A pleasant shade of green */
  color: #ffffff;
  padding: 12px 25px; /* More generous padding */
  border: none;
  border-radius: 8px; /* More rounded button */
  cursor: pointer;
  font-size: 16px;
  font-weight: 600; /* Bolder text */
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #479888; /* Darker green on hover */
    transform: translateY(-1px); /* Slight lift effect */
  }

  &:active {
    background-color:#52bfa9; /* Even darker green on click */
    transform: translateY(0); /* Press effect */
  }
`;

export default BlockedSectionModal;