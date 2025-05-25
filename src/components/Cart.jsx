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

const Cart = () => {
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const {
    count,
    groupedProducts,
    handleClearCart
  } = useAppContext();

  return (
    <>
      {count === 0 ? (
        <>
          <EmptyProductList>¡El carrito está vacío!</EmptyProductList>
          {isCartPage && (
            <ContinueShoppingWrapper>
              <Link to="/home" style={{paddingBottom: "50px"}}>
                <i className="la la-chevron-left"></i> Ir al inicio
              </Link>
            </ContinueShoppingWrapper>
          )}
        </>
      ) : (
        isCartPage ? (
          <CartPageWrapper>
            <StyledCartContainer isCartPage={isCartPage}>
              <SlideContainer>
                <ListContainer>
                  <StyledCartTitle>
                    <div>¡El carrito posee {count} {count === 1 ? 'producto' : 'productos'}!</div>
                    <StyledClearButton onClick={handleClearCart} isCartPage={isCartPage}>
                      Vaciar carrito
                      <i className="la la-cart-arrow-down" style={{ fontSize: '25px', marginLeft: '8px' }}></i>
                    </StyledClearButton>
                  </StyledCartTitle>

                  <ul style={productsListStyle}>
                    {groupedProducts.map((product) => (
                      <StyledProductItem key={`Producto-${product.id}`} isCartPage={isCartPage}>
                        <div>{product.quantity} - {product.name}</div>
                        <div>${product.price * product.quantity}</div>
                      </StyledProductItem>
                    ))}
                  </ul>

                  <StyledTotal isCartPage={isCartPage}>
                    Total: ${groupedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)}
                  </StyledTotal>
                </ListContainer>
              </SlideContainer>
            </StyledCartContainer>
            {isCartPage && (
              <ContinueShoppingWrapper>
                <Link to="/home">
                  <i className="la la-chevron-left"></i> Seguir comprando
                </Link>
              </ContinueShoppingWrapper>
            )}
          </CartPageWrapper>
        ) : (
          <StyledCartContainer isCartPage={isCartPage}>
            <SlideContainer>
              <ListContainer>
                <StyledCartTitle>
                  <div>¡El carrito posee {count} {count === 1 ? 'producto' : 'productos'}!</div>
                  <StyledClearButton onClick={handleClearCart} isCartPage={isCartPage}>
                    Vaciar carrito
                    <i className="la la-cart-arrow-down" style={{ fontSize: '25px', marginLeft: '8px' }}></i>
                  </StyledClearButton>
                </StyledCartTitle>

                <ul style={productsListStyle}>
                  {groupedProducts.map((product) => (
                    <StyledProductItem key={`Producto-${product.id}`} isCartPage={isCartPage}>
                      <div>{product.quantity} - {product.name}</div>
                      <div>${product.price * product.quantity}</div>
                    </StyledProductItem>
                  ))}
                </ul>

                <StyledTotal isCartPage={isCartPage}>
                  Total: ${groupedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)}
                </StyledTotal>
              </ListContainer>
            </SlideContainer>
          </StyledCartContainer>
        )
      )}

      {
        !isCartPage && count > 0 && (
          <PayButton>
            <Link to="/cart" style={{ textDecoration: 'none', color: '#ededed' }}>
              Ir a pagar
            </Link>
            <i className="la la-money-bill" style={{ fontSize: "30px", marginLeft: "10px" }}></i>
          </PayButton>
        )
      }
    </>
  );
};

export default Cart;

const CartPageWrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCartContainer = styled.div`
  font-weight: 600;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 70vh;
  width: 100%;
  max-width: 800px;

  @media (min-width: 768px) {
    flex-direction: ${(props) => (props.isCartPage ? "column" : "column")};
  }
`;

const SlideContainer = styled.div`
  animation: ${slideInRight} 0.5s ease forwards;
`;

const StyledCartTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #333;
  margin-bottom: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${(props) =>
    props.isCartPage
      ? `
  @media (max-width: 1145px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;
  }
  `
      : `
  @media (max-width: 1145px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    justify-content: center;
  }
  `}
`;

const StyledClearButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  color: #ededed;
  cursor: pointer;
  background-color: #9272b4;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;

  ${(props) =>
    props.isCartPage
      ? `
    align-self: flex-end;
    width: auto;
        @media (max-width: 760px) {
      width: 100%;
      align-self: stretch;
    }
  `
      : `
    align-self: flex-end;

    @media (max-width: 1145px) {
      width: 100%;
      align-self: stretch;
    }
  `}
`;

const ContinueShoppingWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  a {
    text-decoration: none;
    color: #6433a6;
    font-weight: 600;
    font-size: 18px;
    margin-left: 20px;
  }

  @media (max-width: 1145px) {
    justify-content: flex-start;
    a {
      margin-left: 0;
      margin-right: 20px;
    }
  }
`;

const StyledProductItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 10px 0;
  margin: ${(props) => (props.isCartPage ? "0 10px" : "0 20px")};
  width: 100%;
  border-bottom: 1px solid #ddd;
  font-size: 15px;

  @media (max-width: 768px) {
    padding: 10px;
    grid-template-columns: 1fr auto;
  }
`;

const StyledTotal = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #888;
  margin-top: 50px;
  text-align: end;
  margin-right: ${(props) => (props.isCartPage ? "20px" : "0px")};

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const EmptyProductList = styled.div`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  min-height: 70vh;
  margin-top: 50px;
`;

const ListContainer = styled.div`
  width:   ${(props) => (props.isCartPage ? " 600px" : "100%")};
  min-width: 80%;
  margin-right: 40px;
    @media (max-width: 768px) {
  width: 100%;	
  }

`;

const productsListStyle = {
  fontWeight: 400,
  lineHeight: "25px",
  fontSize: "15px",
  listStyle: "none",
  color: "#333",
  marginTop: 15,
  textAlign: "left"
};

const PayButton = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: #ededed;
  cursor: pointer;
  background-color: #a2d2c7;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
