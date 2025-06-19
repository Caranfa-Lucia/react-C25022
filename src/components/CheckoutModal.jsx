import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useAppContext } from '../context/AppContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const successPulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const checkmarkAnimation = keyframes`
  from {
    stroke-dashoffset: 100;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CheckoutModal = ({
    open = false,
    cartTotal = 0,
    onClose = () => { },
}) => {
    const { groupedProducts, handleClearCart } = useAppContext();
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        document: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPostalCode = (code) => {
        return /^\d+$/.test(code);
    };

    const isValidCardNumber = (number) => {
        const cleanNumber = number.replace(/\s/g, '');
        return /^\d{16}$/.test(cleanNumber);
    };

    const isValidExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(date)) return false;

        const [month, year] = date.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expYear = parseInt(year);
        const expMonth = parseInt(month);

        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;

        return true;
    };

    const isValidCVV = (cvv) => {
        return /^\d{3}$/.test(cvv);
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Ingresa un correo electrónico válido';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre completo es requerido';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'La dirección es requerida';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'La ciudad es requerida';
        }

        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'El código postal es requerido';
        } else if (!isValidPostalCode(formData.postalCode)) {
            newErrors.postalCode = 'El código postal debe contener solo números';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.cardNumber.trim()) {
            newErrors.cardNumber = 'El número de tarjeta es requerido';
        } else if (!isValidCardNumber(formData.cardNumber)) {
            newErrors.cardNumber = 'Ingresá un número de tarjeta válido';
        }

        if (!formData.expiryDate.trim()) {
            newErrors.expiryDate = 'La fecha de vencimiento es requerida';
        } else if (!isValidExpiryDate(formData.expiryDate)) {
            newErrors.expiryDate = 'Ingresá una fecha válida';
        }

        if (!formData.cvv.trim()) {
            newErrors.cvv = 'El CVV es requerido';
        } else if (!isValidCVV(formData.cvv)) {
            newErrors.cvv = 'El CVV debe tener 3 dígitos';
        }

        if (!formData.cardName.trim()) {
            newErrors.cardName = 'El nombre en la tarjeta es requerido';
        }

        if (!formData.document.trim()) {
            newErrors.document = 'El número de documento es requerido';
        } else if (!isValidPostalCode(formData.document)) {
            newErrors.document = 'El número de documento solo debe contener números';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = validateStep1();
        } else if (currentStep === 2) {
            isValid = validateStep2();
        }

        if (isValid && currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handlePayment = async () => {
        const step1Valid = validateStep1();
        const step2Valid = validateStep2();

        if (!step1Valid || !step2Valid) {
            setCurrentStep(1);
            return;
        }
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);

            setTimeout(() => {
                handleClearCart();
                handleClose();
            }, 3000);
        }, 2500);
    };

    const handleClose = () => {
        setCurrentStep(1);
        setPaymentSuccess(false);
        setIsProcessing(false);
        setErrors({});
        setFormData({
            email: '',
            fullName: '',
            address: '',
            city: '',
            postalCode: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardName: '',
            document: ''
        });
        onClose();
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData(prev => ({
            ...prev,
            cardNumber: formatted
        }));

        if (errors.cardNumber) {
            setErrors(prev => ({
                ...prev,
                cardNumber: ''
            }));
        }
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setFormData(prev => ({
            ...prev,
            expiryDate: value
        }));

        if (errors.expiryDate) {
            setErrors(prev => ({
                ...prev,
                expiryDate: ''
            }));
        }
    };

    if (!open) return null;

    return (
        <ModalOverlay onClick={handleClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {paymentSuccess ? (
                    <SuccessContainer>
                        <SuccessIcon>
                            <CheckmarkSVG viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#10ac84"
                                    strokeWidth="4"
                                />
                                <path
                                    d="M25 50 L40 65 L75 30"
                                    fill="none"
                                    stroke="#10ac84"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="100"
                                    strokeDashoffset="100"
                                />
                            </CheckmarkSVG>
                        </SuccessIcon>
                        <SuccessTitle>¡Pago Exitoso! 🎉</SuccessTitle>
                        <SuccessMessage>
                            Tu pago de <strong>${cartTotal.toLocaleString()}</strong> ha sido procesado correctamente.
                        </SuccessMessage>
                        <SuccessSubtext>
                            Recibirás un email de confirmación en breve. ¡Gracias por tu compra!
                        </SuccessSubtext>
                    </SuccessContainer>
                ) : (
                    <>
                        <ModalHeader>
                            <ModalTitle>Finalizar compra</ModalTitle>
                            <CloseButton onClick={handleClose}>×</CloseButton>
                        </ModalHeader>

                        <StepsIndicator>
                            <Step $active={currentStep >= 1} completed={currentStep > 1}>
                                <StepNumber completed={currentStep > 1} $active={currentStep >= 1}>1</StepNumber>
                                <StepLabel>Datos personales</StepLabel>
                            </Step>
                            <StepLine completed={currentStep > 1} />
                            <Step $active={currentStep >= 2} completed={currentStep > 2}>
                                <StepNumber completed={currentStep > 2} $active={currentStep >= 2}>2</StepNumber>
                                <StepLabel>Método de pago</StepLabel>
                            </Step>
                            <StepLine completed={currentStep > 2} />
                            <Step $active={currentStep >= 3}>
                                <StepNumber $active={currentStep >= 3}>3</StepNumber>
                                <StepLabel>Confirmación</StepLabel>
                            </Step>
                        </StepsIndicator>

                        <ModalBody>
                            {currentStep === 1 && (
                                <StepContent>
                                    <SectionTitle>Información de contacto</SectionTitle>
                                    <FormGroup>
                                        <FormInput
                                            type="email"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            $hasError={!!errors.email}
                                        />
                                        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                                    </FormGroup>

                                    <SectionTitle>Dirección de envío</SectionTitle>
                                    <FormGroup>
                                        <FormInput
                                            type="text"
                                            name="fullName"
                                            placeholder="Nombre completo"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            $hasError={!!errors.fullName}
                                        />
                                        {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
                                    </FormGroup>
                                    <FormGroup>
                                        <FormInput
                                            type="text"
                                            name="address"
                                            placeholder="Dirección"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            $hasError={!!errors.address}
                                        />
                                        {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
                                    </FormGroup>
                                    <FormRow>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="city"
                                                placeholder="Ciudad"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                $hasError={!!errors.city}
                                            />
                                            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="postalCode"
                                                placeholder="Código postal"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                required
                                                $hasError={!!errors.postalCode}
                                            />
                                            {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
                                        </FormGroup>
                                    </FormRow>
                                </StepContent>
                            )}

                            {currentStep === 2 && (
                                <StepContent>
                                    <SectionTitle>Información de la tarjeta</SectionTitle>
                                    <FormRow>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Número de tarjeta (1234 5678 9012 3456)"
                                                value={formData.cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength="19"
                                                required
                                                $hasError={!!errors.cardNumber}
                                            />
                                            {errors.cardNumber && <ErrorMessage>{errors.cardNumber}</ErrorMessage>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="document"
                                                placeholder="Número de documento"
                                                value={formData.document}
                                                onChange={handleInputChange}
                                                required
                                                $hasError={!!errors.document}
                                            />
                                            {errors.document && <ErrorMessage>{errors.document}</ErrorMessage>}
                                        </FormGroup>
                                    </FormRow>
                                    <FormRow>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="expiryDate"
                                                placeholder="MM/AA"
                                                value={formData.expiryDate}
                                                onChange={handleExpiryDateChange}
                                                maxLength="5"
                                                required
                                                $hasError={!!errors.expiryDate}
                                            />
                                            {errors.expiryDate && <ErrorMessage>{errors.expiryDate}</ErrorMessage>}
                                        </FormGroup>
                                        <FormGroup>
                                            <FormInput
                                                type="text"
                                                name="cvv"
                                                placeholder="CVV"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                maxLength="3"
                                                required
                                                $hasError={!!errors.cvv}
                                            />
                                            {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
                                        </FormGroup>
                                    </FormRow>
                                    <FormGroup>
                                        <FormInput
                                            type="text"
                                            name="cardName"
                                            placeholder="Nombre en la tarjeta"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            required
                                            $hasError={!!errors.cardName}
                                        />
                                        {errors.cardName && <ErrorMessage>{errors.cardName}</ErrorMessage>}
                                    </FormGroup>
                                    <SecurityNote>
                                        🔒 Tu información está protegida con encriptación SSL
                                    </SecurityNote>
                                </StepContent>
                            )}

                            {currentStep === 3 && (
                                <StepContent>
                                    <SectionTitle>Resumen del pedido</SectionTitle>
                                    <OrderSummary>
                                        {groupedProducts.map((product) => (
                                            <SummaryItem key={product.id}>
                                                <ProductSummary>
                                                    <ProductName>{product.name}</ProductName>
                                                    <ProductDetails>
                                                        Cantidad: {product.quantity} × ${product.price.toLocaleString()}
                                                    </ProductDetails>
                                                </ProductSummary>
                                                <ProductTotal>
                                                    ${(product.price * product.quantity).toLocaleString()}
                                                </ProductTotal>
                                            </SummaryItem>
                                        ))}
                                        <TotalLine />
                                        <TotalSummary>
                                            <TotalLabel>Total a pagar:</TotalLabel>
                                            <TotalAmount>${cartTotal.toLocaleString()}</TotalAmount>
                                        </TotalSummary>
                                    </OrderSummary>

                                    <ShippingInfo>
                                        <InfoTitle>Información de envío</InfoTitle>
                                        <InfoText>{formData.fullName || 'Nombre no especificado'}</InfoText>
                                        <InfoText>{formData.address || 'Dirección no especificada'}</InfoText>
                                        <InfoText>{formData.city || 'Ciudad'}, {formData.postalCode || 'CP'}</InfoText>
                                    </ShippingInfo>
                                </StepContent>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            {currentStep > 1 && !isProcessing && (
                                <SecondaryButton onClick={handlePrevStep}>
                                    ← Anterior
                                </SecondaryButton>
                            )}

                            <div style={{ flex: 1 }} />

                            {currentStep < 3 ? (
                                <PrimaryButton onClick={handleNextStep}>
                                    Siguiente →
                                </PrimaryButton>
                            ) : (
                                <PayButton onClick={handlePayment} disabled={isProcessing}>
                                    {isProcessing ? (
                                        <>
                                            <ProcessingSpinner />
                                            Procesando...
                                        </>
                                    ) : (
                                        <>
                                            💳 Pagar ${cartTotal.toLocaleString()}
                                        </>
                                    )}
                                </PayButton>
                            )}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </ModalOverlay>
    );
};


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 600px;
  max-height: 95vh;
  overflow: hidden;
  ${css`animation: ${slideInUp} 0.4s ease-out;`}
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

const StepsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: ${({ $active }) => $active ? 1 : 0.4};
  transition: all 0.3s ease;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ completed, $active }) =>
        completed
            ? 'linear-gradient(135deg, #10ac84, #1dd1a1)'
            : $active
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : '#e0e0e0'
    };
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  text-align: center;
`;

const StepLine = styled.div`
  width: 60px;
  height: 2px;
  background: ${({ completed }) =>
        completed
            ? 'linear-gradient(90deg, #10ac84, #1dd1a1)'
            : '#e0e0e0'
    };
  transition: all 0.5s ease;
`;

const ModalBody = styled.div`
  padding: 0 2rem;
  max-height: 50vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 3px;
  }
`;

const StepContent = styled.div`
  ${css`animation: ${slideInLeft} 0.4s ease-out;`}
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 1.5rem 0 1rem 0;
  
  &:first-child {
    margin-top: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
    border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e0e0e0'};
  
  &:focus {
    border-color: ${props => props.$hasError ? '#e74c3c' : '#e0e0e0'};
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #10ac84;
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(16, 172, 132, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(16, 172, 132, 0.2);
`;

const OrderSummary = styled.div`
  background: rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-of-type {
    border-bottom: none;
  }
`;

const ProductSummary = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ProductDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ProductTotal = styled.div`
  font-weight: 700;
  color: #667eea;
  font-size: 1.1rem;
`;

const TotalLine = styled.div`
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 1px;
  margin: 1rem 0;
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const TotalLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const TotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const ShippingInfo = styled.div`
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

const InfoTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.75rem 0;
`;

const InfoText = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.95rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem 2rem 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  gap: 1rem;
`;

const SecondaryButton = styled.button`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const PayButton = styled.button`
  background: linear-gradient(135deg, #10ac84, #1dd1a1);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(16, 172, 132, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(16, 172, 132, 0.4);
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: none;
  }

  ${({ disabled }) => disabled && css`
    animation: ${pulse} 1.5s infinite;
  `}
`;

const ProcessingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  ${css`animation: ${spin} 1s linear infinite;`}
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  ${css`animation: ${successPulse} 0.8s ease-out;`}
`;

const SuccessIcon = styled.div`
  margin-bottom: 2rem;
`;

const CheckmarkSVG = styled.svg`
  width: 120px;
  height: 120px;
  
  circle {
    ${css`animation: ${pulse} 1s ease-out;`}
  }
  
  path {
    ${css`animation: ${checkmarkAnimation} 1s ease-out 0.5s forwards;`}
  }
`;

const SuccessTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #10ac84;
  margin: 0 0 1rem 0;
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const SuccessSubtext = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  font-weight: 500;
`;

export default CheckoutModal;