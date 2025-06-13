import React, { useState, useContext } from "react";
import { AdminContext } from '../context/AdminContext';
import { useAppContext } from '../context/AppContext';
import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import { Helmet } from "react-helmet-async";

const Admin = () => {
    const { productos } = useAppContext();
    const { loading, error, addProduct, deleteProduct, saveEditedProduct, open, setOpen } = useContext(AdminContext);
    const [selectedProduct, setselectedProduct] = useState(null);

    return (
        <Container>
            <Helmet>
                <title>ADMIN</title>
                <meta name="description" content="Administración de productos." />
            </Helmet>

            <BackgroundBlur />

            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>Cargando productos...</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    <Header>
                        <Title>Panel Administrativo</Title>
                        <Subtitle>Gestiona tu inventario de productos</Subtitle>
                    </Header>

                    {error && (
                        <ErrorMessage>
                            <ErrorIcon>⚠</ErrorIcon>
                            Hubo un error al cargar los productos.
                        </ErrorMessage>
                    )}

                    <ProductsSection>
                        <SectionTitle>
                            <span>Productos</span>
                            <ProductCount>{productos?.length || 0}</ProductCount>
                        </SectionTitle>

                        <ProductGrid>
                            <AddProductCard onClick={() => {
                                setselectedProduct(null);
                                setOpen(true);
                            }}>
                                <AddIcon>+</AddIcon>
                                <AddText>Agregar nuevo producto</AddText>
                            </AddProductCard>
                            {productos?.map((product) => (
                                <ProductCard key={`${product.id}-${product.name}`}>
                                    <ProductImageContainer>
                                        <ProductImage src={product.image} alt={product.name} />
                                        <ProductOverlay>
                                            <QuickActions>
                                                <QuickActionButton
                                                    onClick={() => {
                                                        setselectedProduct(product);
                                                        setOpen(true);
                                                    }}
                                                    title="Editar producto"
                                                >
                                                    ✏️
                                                </QuickActionButton>
                                                <QuickActionButton
                                                    onClick={() => deleteProduct(product.id)}
                                                    title="Eliminar producto"
                                                    danger
                                                >
                                                    🗑️
                                                </QuickActionButton>
                                            </QuickActions>
                                        </ProductOverlay>
                                    </ProductImageContainer>

                                    <ProductInfo>
                                        <ProductName>{product.name}</ProductName>
                                        <ProductPrice>${product.price}</ProductPrice>
                                    </ProductInfo>

                                    <ButtonGroup>
                                        <EditButton onClick={() => {
                                            setselectedProduct(product);
                                            setOpen(true);
                                        }}>
                                            <ButtonIcon>✏️</ButtonIcon>
                                            Editar
                                        </EditButton>
                                        <DeleteButton onClick={() => deleteProduct(product.id)}>
                                            <ButtonIcon>🗑️</ButtonIcon>
                                            Eliminar
                                        </DeleteButton>
                                    </ButtonGroup>
                                </ProductCard>
                            ))}
                        </ProductGrid>
                    </ProductsSection>
                </>
            )}

            {open && (
                <ModalBackdrop onClick={() => setOpen(false)}>
                    <ProductForm
                        selectedProduct={selectedProduct}
                        onSubmit={(data) => {
                            if (data.id) {
                                saveEditedProduct(data);
                            } else {
                                addProduct(data);
                            }
                            setselectedProduct(null);
                        }}
                        onClose={() => {
                            setselectedProduct(null);
                            setOpen(false);
                        }}
                    />
                </ModalBackdrop>
            )}
        </Container>
    );
};

const Container = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow-x: hidden;
`;

const BackgroundBlur = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
`;

const Header = styled.div`
    text-align: center;
    padding: 3rem 2rem 2rem;
    position: relative;
    z-index: 1;
`;

const Title = styled.h1`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 1rem 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.5px;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 2rem;
`;

const LoadingSpinner = styled.div`
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    color: white;
    font-size: 1.2rem;
    font-weight: 300;
`;

const ErrorMessage = styled.div`
    background: rgba(244, 67, 54, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 16px;
    padding: 1.5rem;
    margin: 0 2rem 2rem;
    color: #ff6b6b;
    text-align: center;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
`;

const ErrorIcon = styled.span`
    font-size: 1.2rem;
`;

const ProductsSection = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 4rem;
    position: relative;
    z-index: 1;
`;

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    
    span {
        color: white;
        font-size: 1.8rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }
`;

const ProductCount = styled.div`
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    min-width: 40px;
    text-align: center;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
`;

const ProductCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 1.5rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    }
    
    &:hover {
        transform: translateY(-10px) scale(1.02);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
`;

const ProductImageContainer = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
    aspect-ratio: 1;
    
    &:hover .product-overlay {
        opacity: 1;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    ${ProductImageContainer}:hover & {
        transform: scale(1.1);
    }
`;

const ProductOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
    
    &.product-overlay {
        opacity: 0;
    }
`;

const QuickActions = styled.div`
    display: flex;
    gap: 1rem;
`;

const QuickActionButton = styled.button`
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: ${props => props.danger ? 'rgba(244, 67, 54, 0.9)' : 'rgba(33, 150, 243, 0.9)'};
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        transform: scale(1.1);
        background: ${props => props.danger ? '#f44336' : '#2196f3'};
    }
`;

const ProductInfo = styled.div`
    text-align: center;
    margin-bottom: 1.5rem;
`;

const ProductName = styled.h3`
    color: white;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
`;

const ProductPrice = styled.p`
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg,rgb(118, 255, 122),rgb(126, 167, 128));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.8rem;
    
    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

const BaseButton = styled.button`
    flex: 1;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
`;

const EditButton = styled(BaseButton)`
    background: linear-gradient(135deg, #2196f3, #1976d2);
    color: white;
    
    &:hover {
        background: linear-gradient(135deg, #1976d2, #1565c0);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(33, 150, 243, 0.4);
    }
`;

const DeleteButton = styled(BaseButton)`
    background: linear-gradient(135deg, #f44336, #d32f2f);
    color: white;
    
    &:hover {
        background: linear-gradient(135deg, #d32f2f, #c62828);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(244, 67, 54, 0.4);
    }
`;

const ButtonIcon = styled.span`
    font-size: 1rem;
    background: #fff;
    padding: 0.3rem;
    border-radius: 50%;
`;

const AddProductCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    min-height: 300px;
    
    &:hover {
        transform: translateY(-10px) scale(1.02);
        background: rgba(76, 175, 80, 0.15);
        border-color: rgba(76, 175, 80, 0.5);
        box-shadow: 0 20px 40px rgba(76, 175, 80, 0.2);
    }
`;

const AddIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
    
    ${AddProductCard}:hover & {
        transform: rotate(90deg) scale(1.1);
    }
`;

const AddText = styled.span`
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.4;
`;

const ModalBackdrop = styled.div`
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
    
    @media (max-width: 768px) {
        padding: 1rem;
    }
`;

export default Admin;