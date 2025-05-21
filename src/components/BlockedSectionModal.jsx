import React from 'react'
import { useAppContext } from '../context/AppContext';
import stop from '../images/stop.png';

const BlockedSectionModal = () => {

 const {
    isLoggedIn,
    showBlockedModal,
    setShowBlockedModal,
  } = useAppContext();

        const handleClose = () => {
    setShowBlockedModal(false);
  };

  return (
    <div>
{!isLoggedIn && showBlockedModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <img src={stop} alt="Stop" width="100px" height="100px" />
            <div style={modalText}>
              <p>Para ingresar a la página del carrito y abonar tus productos, o para ingresar a la sección administrativa, debes iniciar sesión.</p>
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
  height: '350px'
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

export default BlockedSectionModal