import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, CreditCard } from 'lucide-react'
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Cart from './Cart';

const ProductDetails = ({
    id = 0,
    name = "",
    description = "",
    price = 0,
    image = "",
    count = 1,
    handleCount = () => { },
}) => {
    const [buttonHover, setButtonHover] = useState(false)
    const [payHover, setPayHover] = useState(false)
    const [backHover, setBackHover] = useState(false)
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
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={containerStyle}>
            <ContentContainer $opencart={openCart} $istablet={isTablet}>
                <div style={cardStyle}>
                    <div style={gridStyle}>

                        <div style={imageContainerStyle}>
                            <div style={imageWrapperStyle}>
                                <img
                                    src={image}
                                    alt={name}
                                    style={imageStyle}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                        </div>

                        <div style={detailsStyle}>
                            <div>
                                <h1 style={titleStyle}>
                                    {name}
                                </h1>

                                <div style={priceContainerStyle}>
                                    <span style={priceStyle}>
                                        ${price.toLocaleString()}
                                    </span>
                                    <span style={badgeStyle}>
                                        IVA incluido
                                    </span>
                                </div>

                                <p style={descriptionStyle}>
                                    {description}
                                </p>

                                <div style={featuresGridStyle}>
                                    <div style={featureCardStyle}>
                                        <div style={featureLabelStyle}>Envío</div>
                                        <div style={featureValueStyle}>Gratis</div>
                                    </div>
                                    <div style={featureCardStyle}>
                                        <div style={featureLabelStyle}>Garantía</div>
                                        <div style={featureValueStyle}>1 año</div>
                                    </div>
                                </div>
                            </div>

                            <div style={buttonsContainerStyle}>
                                <AddToCartButton onClick={() => handleCount(id, name, price, image)}>
                                    <ShoppingCart size={24} />
                                    Agregar al carrito
                                </AddToCartButton>

                                {count > 0 && (
                                    <Link to="/cart">
                                        <PayButton>
                                            <CreditCard size={24} />
                                            Ir a pagar
                                        </PayButton>
                                    </Link>
                                )}

                                <Link to="/home">
                                    <BackButton>
                                        <ArrowLeft size={20} />
                                        Volver a la tienda
                                    </BackButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={infoSectionStyle}>
                    <h2 style={infoTitleStyle}>Información adicional</h2>
                    <div style={infoGridStyle}>
                        <div style={{ ...infoCardStyle, backgroundColor: '#ecfdf5' }}>
                            <div style={infoIconStyle}>🚚</div>
                            <h3 style={infoCardTitleStyle}>Envío gratis</h3>
                            <p style={infoCardDescStyle}>En compras superiores a $50</p>
                        </div>
                        <div style={{ ...infoCardStyle, backgroundColor: '#eff6ff' }}>
                            <div style={infoIconStyle}>🔒</div>
                            <h3 style={infoCardTitleStyle}>Compra segura</h3>
                            <p style={infoCardDescStyle}>Protección de datos garantizada</p>
                        </div>
                        <div style={{ ...infoCardStyle, backgroundColor: '#faf5ff' }}>
                            <div style={infoIconStyle}>💎</div>
                            <h3 style={infoCardTitleStyle}>Calidad premium</h3>
                            <p style={infoCardDescStyle}>Productos seleccionados</p>
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
    )
}

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

const AddToCartButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: #059669;
  color: white;
  border: 2px solid #059669;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background-color: white;
    color: #059669;
  }
`;

const PayButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: #2563eb;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    background-color: #1d4ed8;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  color: #6b7280;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
    color: #1f2937;
  }
`;

const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    padding: '32px 16px',
    display: 'flex',
}

const cardStyle = {
    maxWidth: '1024px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden'
}

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px'
}

const imageContainerStyle = {
    padding: '32px'
}

const imageWrapperStyle = {
    aspectRatio: '1',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
}

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
}

const detailsStyle = {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const titleStyle = {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '16px',
    lineHeight: '1.2'
}

const priceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap'
}

const priceStyle = {
    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    fontWeight: 'bold',
    color: '#059669'
}

const badgeStyle = {
    fontSize: '0.75rem',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '9999px'
}

const descriptionStyle = {
    color: '#374151',
    lineHeight: '1.6',
    fontSize: '1.125rem',
    marginBottom: '32px'
}

const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
}

const featureCardStyle = {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '12px'
}

const featureLabelStyle = {
    fontSize: '0.875rem',
    color: '#6b7280'
}

const featureValueStyle = {
    fontWeight: '600',
    color: '#059669'
}

const buttonsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
}

const infoSectionStyle = {
    marginTop: '48px',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    padding: '32px',
    maxWidth: '1024px',
    margin: '48px auto 0'
}

const infoTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '24px'
}

const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px'
}

const infoCardStyle = {
    textAlign: 'center',
    padding: '16px',
    borderRadius: '16px'
}

const infoIconStyle = {
    fontSize: '3rem',
    marginBottom: '8px'
}

const infoCardTitleStyle = {
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
}

const infoCardDescStyle = {
    fontSize: '0.875rem',
    color: '#6b7280'
}


export default ProductDetails