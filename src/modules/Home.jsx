import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
  } = useAppContext();

  const [isTablet, setIsTablet] = useState(window.innerWidth <= 900);

  useEffect(() => {
    setOpenCart(false);

    const handleResize = () => {
      setIsTablet(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryProps = {
    setCount,
    setProductList,
    productos,
    loading,
    error,
    handleCount
  };

  return (
    <main>
      <Helmet>
        <title>Bienvenido a mi Ecommerce!</title>
        <meta name="description" content="Galería y home del ecommerce." />
      </Helmet>
      <MainContainer>
        {!(openCart && isTablet) && (
          <GalleryWrapper openCart={openCart} isTablet={isTablet}>
            <Gallery {...galleryProps} />
          </GalleryWrapper>
        )}

        {openCart && (
          <CartWrapper openCart={openCart} isTablet={isTablet}>
            <Cart />
          </CartWrapper>
        )}
      </MainContainer>
    </main>
  );

}
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;
  background-color: #ededed;

  @media (max-width: 1145px) {
    justify-content: center;
  }
`;

const GalleryWrapper = styled.div`
  width: ${({ openCart, isTablet }) => {
    if (openCart) return isTablet ? '10%' : '60%';
    return '95%';
  }};
  transition: width 0.8s ease;
`;

const CartWrapper = styled.div`
  width: ${({ openCart, isTablet }) => (openCart ? (isTablet ? '90%' : '40%') : '0%')};
  transition: width 0.8s ease;
  overflow: hidden;
  white-space: nowrap;
`;

export default Home;