import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import Gallery from './Gallery';
import Cart from '../components/Cart';
import { Helmet } from 'react-helmet-async';

function Home() {
  const {
    productos,
    loading,
    error,
    setCount,
    setProductList,
    openCart,
    setOpenCart,
    handleCount,
    search,
    setSearch,
    productFilter
  } = useAppContext();

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 900);

  useEffect(() => {
    setOpenCart(false);

    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1144);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryProps = {
    setCount,
    setProductList,
    loading,
    error,
    handleCount
  };

  return (
    <MainWrapper>
      <Helmet>
        <title>Bienvenido a mi Ecommerce!</title>
        <meta name="description" content="Galería y home del ecommerce." />
      </Helmet>

      <HeaderSection>
        <SearchContainer>
          <SearchInput
            type='text'
            placeholder='Buscar productos...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchContainer>
      </HeaderSection>

      <MainContainer>
        {!(openCart && isTablet) && (
          <GalleryWrapper openCart={openCart} isTablet={isTablet}>
            <Gallery {...galleryProps} productos={productFilter} />
          </GalleryWrapper>
        )}

        {openCart && (
          <CartWrapper openCart={openCart} isTablet={isTablet}>
            <Cart />
          </CartWrapper>
        )}
      </MainContainer>
    </MainWrapper>
  );
}

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

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const MainWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    z-index: 0;
  }
`;

const HeaderSection = styled.section`
  position: relative;
  z-index: 10;
  padding: 2rem 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #333;
  font-weight: 500;

  &::placeholder {
    color: #888;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 0 0 3px rgba(102, 126, 234, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 1);
  }

  &:hover:not(:focus) {
    transform: translateY(-1px);
    box-shadow: 
      0 10px 36px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 2.5rem 0.875rem 1.25rem;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.6;
  pointer-events: none;
  transition: opacity 0.3s ease;

  ${SearchInput}:focus + & {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    right: 1.25rem;
    font-size: 1.1rem;
  }
`;

const MainContainer = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 140px);
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 1145px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const GalleryWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['openCart', 'isTablet'].includes(prop),
})`
  width: ${({ openCart, isTablet }) => {
    if (openCart) return isTablet ? '0%' : '58%';
    return '100%';
  }};
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;

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
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: ${shimmer} 2s infinite;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 28px 80px rgba(0, 0, 0, 0.15),
      0 12px 40px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 1145px) {
    width: 100% !important;
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    margin: 0;
  }
`;

const CartWrapper = styled.div`
  width: ${({ openCart, isTablet }) => (openCart ? (isTablet ? '100%' : '38%') : '0%')};
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
  animation: ${({ openCart }) => openCart ? slideIn : 'none'} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
    width: ${({ openCart }) => (openCart ? '100%' : '0%')} !important;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

export default Home;