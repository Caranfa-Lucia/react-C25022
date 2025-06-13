import React from 'react';
import { useAppContext } from '../context/AppContext';
import stop from '../images/stop.png';
import styled from 'styled-components';

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
  const blockedAdminModalText = "Por favor, inicie sesión como administrador para ingresar al panel de administración.";

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

const ModalOverlay = styled.div`
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
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px 40px;
  border-radius: 12px; 
  text-align: center;
  width: 90%;
  max-width: 400px; 
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-20px); 
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ModalImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
  }
`;

const ModalText = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 16px;
  color: #333; 
  line-height: 1.5; 

  p {
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ModalButton = styled.button`
  background-color: #4ca996; 
  color: #ffffff;
  padding: 12px 25px; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600; 
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #479888; 
    transform: translateY(-1px);

  &:active {
    background-color: #52bfa9; 
    transform: translateY(0); 

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export default BlockedSectionModal;