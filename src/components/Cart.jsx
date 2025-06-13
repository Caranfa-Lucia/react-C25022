import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
`;

const imageLoadFade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Cart = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const {
    count,
    groupedProducts,
    handleClearCart,
    handleRemoveItem
  } = useAppContext();

  const total = groupedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
  console.log({ groupedProducts })

  return (
    <CartMainWrapper isCartPage={isCartPage}>
      {count === 0 ? (
        <EmptyCartContainer isCartPage={isCartPage}>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyProductList>¡El carrito está vacío!</EmptyProductList>
          <EmptyCartSubtext>Agrega productos para comenzar tu compra</EmptyCartSubtext>
          {isCartPage && (
            <ContinueShoppingWrapper>
              <StyledLink to="/home">
                <LinkIcon>←</LinkIcon>
                Ir al inicio
              </StyledLink>
            </ContinueShoppingWrapper>
          )}
        </EmptyCartContainer>
      ) : (
        <>
          <StyledCartContainer isCartPage={isCartPage}>
            <SlideContainer>
              <CartHeader isCartPage={isCartPage}>
                <CartTitleSection>
                  <CartBadge>{count}</CartBadge>
                  <CartTitleText>
                    {count === 1 ? 'Producto en tu carrito' : 'Productos en tu carrito'}
                  </CartTitleText>
                </CartTitleSection>
                <ClearCartButton onClick={handleClearCart} isCartPage={isCartPage}>
                  <ButtonIcon>🗑️</ButtonIcon>
                  Vaciar carrito
                </ClearCartButton>
              </CartHeader>

              <ProductsList isCartPage={isCartPage}>
                {groupedProducts.map((product, index) => (
                  <ProductItem key={`Producto-${product.id}`} isCartPage={isCartPage} index={index}>
                    <ProductImage isCartPage={isCartPage}>
                      <ImagePlaceholder
                        hasImage={product.image && typeof product.image === 'string' && product.image.startsWith('http')}
                        isCartPage={isCartPage}
                      >
                        {product.image && typeof product.image === 'string' && product.image.startsWith('http') ? (
                          <ProductImg
                            src={product.image}
                            alt={product.name}
                            isCartPage={isCartPage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <FallbackIcon
                          isCartPage={isCartPage}
                          style={{
                            display: product.image && typeof product.image === 'string' && product.image.startsWith('http') ? 'none' : 'flex'
                          }}
                        >
                          {typeof product.image === 'string' && !product.image.startsWith('http')
                            ? product.image
                            : '📦'
                          }
                        </FallbackIcon>
                      </ImagePlaceholder>
                    </ProductImage>
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductQuantity>Cantidad: {product.quantity}</ProductQuantity>
                      <ProductPrice>${(product.price * product.quantity).toLocaleString()}</ProductPrice>
                    </ProductInfo>
                    <ProductActions>
                      <RemoveButton onClick={() => handleRemoveItem(product.id)}>
                        <RemoveIcon>×</RemoveIcon>
                      </RemoveButton>
                    </ProductActions>
                  </ProductItem>
                ))}
              </ProductsList>

              <CartSummary isCartPage={isCartPage}>
                <SummaryLine />
                <TotalSection>
                  <TotalLabel>Total a pagar:</TotalLabel>
                  <TotalAmount>${total.toLocaleString()}</TotalAmount>
                </TotalSection>
              </CartSummary>
            </SlideContainer>
          </StyledCartContainer>

          {!isCartPage && (
            <PayButtonContainer>
              <PayButton to="/cart">
                <PayButtonText>Ir a pagar</PayButtonText>
                <PayButtonIcon>💳</PayButtonIcon>
              </PayButton>
            </PayButtonContainer>
          )}

          {isCartPage && (
            <CartPageActions>
              <ContinueShoppingWrapper>
                <StyledLink to="/home">
                  <LinkIcon>←</LinkIcon>
                  Seguir comprando
                </StyledLink>
              </ContinueShoppingWrapper>
              <CheckoutButton>
                <CheckoutButtonText>Proceder al pago</CheckoutButtonText>
                <CheckoutIcon>→</CheckoutIcon>
              </CheckoutButton>
            </CartPageActions>
          )}
        </>
      )}
    </CartMainWrapper>
  );
};

export default Cart;

const CartMainWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  height: ${({ isCartPage }) => isCartPage ? '100%' : '80vh'};
  max-height: ${({ isCartPage }) => isCartPage ? 'none' : '80vh'};
  display: flex;
  flex-direction: column;
  background: ${({ isCartPage }) =>
    isCartPage
      ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      : 'transparent'
  };
  border-radius: ${({ isCartPage }) => isCartPage ? '0' : '20px'};
  overflow: hidden;
  position: relative;
  padding: ${({ isCartPage }) => isCartPage ? '2rem' : '1.5rem'};

  @media (max-width: 1144px) {
    height: ${({ isCartPage }) => isCartPage ? '100%' : '85vh'};
    max-height: ${({ isCartPage }) => isCartPage ? 'none' : '85vh'};
    padding: ${({ isCartPage }) => isCartPage ? '1.5rem' : '1.25rem'};
  }

  @media (max-width: 768px) {
    height: ${({ isCartPage }) => isCartPage ? '100%' : '75vh'};
    max-height: ${({ isCartPage }) => isCartPage ? 'none' : '75vh'};
    padding: ${({ isCartPage }) => isCartPage ? '1rem' : '1rem'};
  }
`;

const EmptyCartContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ isCartPage }) => isCartPage ? '60vh' : '100%'};
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
  animation: ${bounce} 2s infinite;
`;

const EmptyProductList = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EmptyCartSubtext = styled.div`
  color: #999;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const StyledCartContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* Importante para permitir que el scroll funcione */
  background: ${({ isCartPage }) =>
    isCartPage
      ? 'rgba(255, 255, 255, 0.95)'
      : 'transparent'
  };
  border-radius: ${({ isCartPage }) => isCartPage ? '20px' : '0'};
  backdrop-filter: ${({ isCartPage }) => isCartPage ? 'blur(20px)' : 'none'};
  box-shadow: ${({ isCartPage }) =>
    isCartPage
      ? '0 20px 60px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      : 'none'
  };
  border: ${({ isCartPage }) =>
    isCartPage
      ? '1px solid rgba(255, 255, 255, 0.3)'
      : 'none'
  };
  padding: ${({ isCartPage }) => isCartPage ? '2rem' : '0'};

  @media (max-width: 1144px) {
    padding: ${({ isCartPage }) => isCartPage ? '1.5rem' : '0'};
  }

  @media (max-width: 768px) {
    padding: ${({ isCartPage }) => isCartPage ? '1.5rem' : '0'};
  }
`;

const SlideContainer = styled.div`
  animation: ${slideInRight} 0.5s ease forwards;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0; /* Importante para permitir que el scroll funcione */
`;

const CartHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
  position: relative;
  flex-shrink: 0; /* No se encoge */

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 1px;
  }

  @media (max-width: 1144px) {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    margin-bottom: 1rem;
  }
`;

const CartTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CartBadge = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  animation: ${pulse} 2s infinite;
`;

const CartTitleText = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 1144px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ClearCartButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1144px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ButtonIcon = styled.span`
  font-size: 1.1rem;
`;

const ProductsList = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  min-height: 0; /* Importante para permitir que el scroll funcione */

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

const ProductItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage', 'index'].includes(prop),
})`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 1rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.5s ease-out ${({ index }) => index * 0.1}s backwards;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.6),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(102, 126, 234, 0.2);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: 1144px) {
    grid-template-columns: 55px 1fr auto;
    gap: 0.85rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 50px 1fr auto;
    gap: 0.75rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
  }
`;

const ProductImage = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;

  @media (max-width: 1144px) {
    width: 55px;
    height: 55px;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ImagePlaceholder = styled.div.withConfig({
  shouldForwardProp: (prop) => !['hasImage', 'isCartPage'].includes(prop),
})`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ hasImage }) => hasImage ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
`;

const ProductImg = styled.img.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  animation: ${imageLoadFade} 0.3s ease-out;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const FallbackIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 1144px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductQuantity = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const ProductPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;

  @media (max-width: 1144px) {
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProductActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.4);
    transform: scale(1.1);
  }
`;

const RemoveIcon = styled.span`
  color: #ff6b6b;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;
`;

const CartSummary = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isCartPage'].includes(prop),
})`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  flex-shrink: 0; /* No se encoge */
`;

const SummaryLine = styled.div`
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 1px;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
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
  text-shadow: 0 1px 2px rgba(102, 126, 234, 0.1);
`;

const PayButtonContainer = styled.div`
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out 0.3s backwards;
  flex-shrink: 0; /* No se encoge */
  position: sticky;
  bottom: 0;
  background: inherit;
  padding-top: 1rem;
`;

const PayButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #10ac84, #1dd1a1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(16, 172, 132, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(16, 172, 132, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const PayButtonText = styled.span`
  font-weight: 600;
`;

const PayButtonIcon = styled.span`
  font-size: 1.3rem;
`;

const CartPageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ContinueShoppingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(102, 126, 234, 0.1);

  &:hover {
    background: rgba(102, 126, 234, 0.15);
    transform: translateX(-3px);
  }
`;

const LinkIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  ${StyledLink}:hover & {
    transform: translateX(-2px);
  }
`;

const CheckoutButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const CheckoutButtonText = styled.span`
  font-weight: 600;
`;

const CheckoutIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  ${CheckoutButton}:hover & {
    transform: translateX(3px);
  }
`;