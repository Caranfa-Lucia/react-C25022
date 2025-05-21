import React from 'react'
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

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
      {count === 0 ?
        <div style={emptyProductListStyle}>
          ¡El carrito está vacio!
        </div>
        :
        <div style={isCartPage ? cartPageListStyle : listStyle}>
          <div style={listContainerStyle}>
            <div style={isCartPage ? cartPageTitleStyle : cartTitleStyle}>
              <div>¡El carrito posee {count} {count === 1 ? 'producto' : 'productos'}!</div>
              <div style={emptyChartStyle} onClick={() => handleClearCart()}>
                Vaciar carrito
                <i class="la la-cart-arrow-down" style={{ fontSize: '25px' }}></i>
              </div>
            </div>
            <ul style={productsListStyle}>
              {groupedProducts.map((product) => (
                <li key={`Producto-${product.id}`} style={isCartPage ? cartPageProductItemStyle : productItemStyle}>
                  <div>
                    {product.quantity} - {product.name}
                  </div>
                  <div>
                    ${product.price * product.quantity}
                  </div>
                </li>
              ))}
            </ul>
            <div style={isCartPage ? cartPageTotalStyle : totalStyle}>
              Total: ${groupedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)}
            </div>
          </div>
        </div>
      }
      {isCartPage &&
        <div>
          <Link to="/home" style={{ textDecoration: 'none', color: '#6433a6', fontWeight: 600, marginLeft: '30px', fontSize: '18px' }}>
            <i class="la la-chevron-left"></i>
            Seguir comprando
          </Link>
        </div>
      }
      {
        !isCartPage && count > 0 &&
        <div style={payButtonStyle}>
          <Link to="/cart" style={{ textDecoration: 'none', color: '#ededed' }}>Ir a pagar</Link>
          <i className="la la-money-bill" style={{fontSize: "30px", marginLeft: "10px" }}></i>
        </div>
      }
    </>
  );
};

const emptyProductListStyle = {
  fontWeight: 600,
  fontSize: "20px",
  textAlign: "center",
  minHeight: "70vh",
  marginTop: "50px"
}

const listStyle = {
  fontWeight: 600,
  color: "#333",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  "@media (min-width: 1200px)": {
    flexDirection: "row",
    justifyContent: "center",
  }
}

const cartPageListStyle = {
  fontWeight: 600,
  color: "#333",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  minHeight: "70vh",
  "@media (min-width: 1200px)": {
    flexDirection: "row",
    justifyContent: "center",
  }
}

const listContainerStyle = {
  width: "100%",
  marginRight: 40,
  "@media (min-width: 1200px)": {
    width: "80%",
    margin: "0 auto",
  }
}

const emptyChartStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#ededed",
  cursor: "pointer",
  backgroundColor: "#9272b4",
  padding: "10px",
  borderRadius: "5px",
  display: "inline-block",
  alignSelf: "flex-end"
}

const cartTitleStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#333",
  marginBottom: "35px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const cartPageTitleStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#333",
  marginBottom: "35px",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "40px"
}

const productsListStyle = {
  paddingLeft: "20px",
  fontWeight: 400,
  fontSize: "15px",
  listStyle: "none",
  color: "#333",
  marginTop: 15
}

const productItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  width: "100%",
  "@media (min-width: 1200px)": {
    width: "80%",
    margin: "0 auto",
    justifyContent: "center",
    flexDirection: "column"
  }
}

const cartPageProductItemStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "0px 250px 10px 250px",
  width: "100%",
  "@media (min-width: 1200px)": {
    width: "80%",
    margin: "0 auto",
    justifyContent: "center",
    flexDirection: "column"
  }
}

const totalStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#888",
  marginTop: "50px"
}

const cartPageTotalStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#888",
  marginTop: "50px",
  marginRight: "280px",
  textAlign: "end"
}

const payButtonStyle = {
  fontWeight: 600,
  fontSize: "18px",
  color: "#ededed",
  cursor: "pointer",
  backgroundColor: "#a2d2c7",
  padding: "10px",
  borderRadius: "5px",
  marginTop: "20px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

export default Cart;