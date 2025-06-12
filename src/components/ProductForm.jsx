import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ProductForm({ selectedProduct, onSubmit, onClose }) {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        image: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            setProduct({
                id: '',
                name: '',
                price: '',
                description: '',
                image: ''
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validarFormulario = () => {
        const newErrors = {};
        if (!product.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!product.price || product.price <= 0) newErrors.price = 'El precio debe ser mayor a 0.';
        if (!product.description.trim() || product.description.length < 10)
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        if (!product.image.trim()) newErrors.image = 'La imagen es obligatoria.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setIsSubmitting(true);
        
        // Simular un pequeño delay para mostrar el estado de carga
        setTimeout(() => {
            onSubmit(product);
            setProduct({ id: '', name: '', price: '', description: '', image: '' });
            setIsSubmitting(false);
        }, 500);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <ModalOverlay onClick={handleBackdropClick}>
            <FormContainer onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <FormHeader>
                    <HeaderContent>
                        <FormTitle>{selectedProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}</FormTitle>
                        <FormSubtitle>
                            {selectedProduct ? 'Modifica los detalles del producto' : 'Completa la información del producto'}
                        </FormSubtitle>
                    </HeaderContent>
                    <CloseButton onClick={onClose} type="button">
                        <CloseIcon>✕</CloseIcon>
                    </CloseButton>
                </FormHeader>

                <FormBody>
                    <FormRow>
                        <FormGroup>
                            <Label>
                                <LabelIcon>🏷️</LabelIcon>
                                Nombre del Producto
                            </Label>
                            <InputContainer hasError={errors.name}>
                                <Input 
                                    type="text" 
                                    name="name" 
                                    value={product.name} 
                                    onChange={handleChange}
                                    placeholder="Ej: iPhone 15 Pro"
                                />
                                <InputFocus />
                            </InputContainer>
                            {errors.name && <ErrorText>{errors.name}</ErrorText>}
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>
                                <LabelIcon>💰</LabelIcon>
                                Precio
                            </Label>
                            <InputContainer hasError={errors.price}>
                                <PriceInput 
                                    type="number" 
                                    name="price" 
                                    value={product.price} 
                                    onChange={handleChange} 
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                />
                                <PriceSymbol>$</PriceSymbol>
                                <InputFocus />
                            </InputContainer>
                            {errors.price && <ErrorText>{errors.price}</ErrorText>}
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>
                                <LabelIcon>📝</LabelIcon>
                                Descripción
                            </Label>
                            <InputContainer hasError={errors.description}>
                                <TextArea 
                                    name="description" 
                                    value={product.description} 
                                    onChange={handleChange}
                                    placeholder="Describe las características principales del producto..."
                                    rows="4"
                                />
                                <InputFocus />
                            </InputContainer>
                            <CharacterCount>
                                {product.description.length}/200 caracteres
                            </CharacterCount>
                            {errors.description && <ErrorText>{errors.description}</ErrorText>}
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>
                                <LabelIcon>🖼️</LabelIcon>
                                URL de la Imagen
                            </Label>
                            <InputContainer hasError={errors.image}>
                                <Input 
                                    type="url" 
                                    name="image" 
                                    value={product.image} 
                                    onChange={handleChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
                                <InputFocus />
                            </InputContainer>
                            {product.image && (
                                <ImagePreview>
                                    <PreviewImage src={product.image} alt="Vista previa" />
                                    <PreviewLabel>Vista previa</PreviewLabel>
                                </ImagePreview>
                            )}
                            {errors.image && <ErrorText>{errors.image}</ErrorText>}
                        </FormGroup>
                    </FormRow>
                </FormBody>

                <FormFooter>
                    <CancelButton type="button" onClick={onClose}>
                        Cancelar
                    </CancelButton>
                    <SubmitButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <LoadingSpinner />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <ButtonIcon>{selectedProduct ? '💾' : '➕'}</ButtonIcon>
                                {selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}
                            </>
                        )}
                    </SubmitButton>
                </FormFooter>
            </FormContainer>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
    animation: fadeIn 0.3s ease-out;
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
        padding: 1rem;
        align-items: flex-start;
        padding-top: 2rem;
    }
`;

const FormContainer = styled.form`
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    
    /* Scrollbar personalizado */
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        margin: 4px 0;
    }
    
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #8a57c8, #764ba2);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #8a57c8, #6a4190);
        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    
    &::-webkit-scrollbar-thumb:active {
        background: linear-gradient(135deg, #8a57c8, #5d3a7e);
    }
    
    /* Para Firefox */
    scrollbar-width: thin;
    scrollbar-color:#b0bfff rgba(0, 0, 0, 0.05);
    
    @keyframes slideUp {
        from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #ac66ea, #764ba2, #7024c6);
        background-size: 200% 100%;
        animation: gradientShift 3s ease infinite;
        z-index: 1;
    }
    
    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    @media (max-width: 768px) {
        margin: 0;
        border-radius: 20px;
        max-height: 85vh;
        
        &::-webkit-scrollbar {
            width: 6px;
        }
    }
`;

const FormHeader = styled.div`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    }
    
    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const HeaderContent = styled.div`
    flex: 1;
`;

const FormIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;

const FormTitle = styled.h2`
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.01em;
    
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const FormSubtitle = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    margin: 0;
    font-weight: 300;
`;

const CloseButton = styled.button`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const CloseIcon = styled.span`
    color: white;
    font-size: 1.2rem;
    font-weight: 300;
`;

const FormBody = styled.div`
    padding: 2rem;
    
    @media (max-width: 768px) {
        padding: 1.5rem;
    }
`;

const FormRow = styled.div`
    margin-bottom: 1.5rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const FormGroup = styled.div`
    width: 100%;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #333;
    margin-bottom: 0.8rem;
    letter-spacing: 0.3px;
`;

const LabelIcon = styled.span`
    font-size: 1rem;
`;

const InputContainer = styled.div`
    position: relative;
    
    &:focus-within {
        .input-focus {
            width: 100%;
        }
    }
`;

const InputFocus = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
    border-radius: 1px;
    
    &.input-focus {
        width: 0;
    }
`;

const BaseInput = styled.input`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid ${props => props.hasError ? '#ff6b6b' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 16px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    font-family: inherit;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
        font-weight: 300;
    }
    
    &:focus {
        outline: none;
        border-color: #667eea;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        transform: translateY(-1px);
    }
    
    &:hover:not(:focus) {
        border-color: rgba(0, 0, 0, 0.2);
    }
`;

const Input = styled(BaseInput)``;

const PriceInput = styled(BaseInput)`
    padding-left: 3rem;
`;

const PriceSymbol = styled.div`
    position: absolute;
    left: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #667eea;
    font-weight: 600;
    font-size: 1.1rem;
    pointer-events: none;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid ${props => props.hasError ? '#ff6b6b' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 16px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    
    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
        font-weight: 300;
    }
    
    &:focus {
        outline: none;
        border-color: #667eea;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        transform: translateY(-1px);
    }
    
    &:hover:not(:focus) {
        border-color: rgba(0, 0, 0, 0.2);
    }
`;

const CharacterCount = styled.div`
    text-align: right;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 0.5rem;
`;

const ImagePreview = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const PreviewImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const PreviewLabel = styled.span`
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 500;
`;

const ErrorText = styled.p`
    color: #ff6b6b;
    font-size: 0.85rem;
    margin: 0.5rem 0 0 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    
    &::before {
        content: '⚠';
        font-size: 0.9rem;
    }
`;

const FormFooter = styled.div`
    background: rgba(0, 0, 0, 0.02);
    padding: 1.5rem 2rem;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    
    @media (max-width: 768px) {
        padding: 1.5rem;
        flex-direction: column-reverse;
    }
`;

const BaseButton = styled.button`
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-width: 120px;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
    }
    
    &:hover::before {
        left: 100%;
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
    
    @media (max-width: 768px) {
        min-width: 100%;
        padding: 1rem;
    }
`;

const CancelButton = styled(BaseButton)`
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    border: 1px solid rgba(0, 0, 0, 0.1);
    
    &:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
        transform: translateY(-1px);
    }
`;

const SubmitButton = styled(BaseButton)`
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    
    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #45a049, #3d8b40);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3);
    }
`;

const ButtonIcon = styled.span`
    font-size: 1rem;
`;

const LoadingSpinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default ProductForm;