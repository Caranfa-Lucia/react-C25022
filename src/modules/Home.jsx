import React, { useEffect} from 'react';
import { useAppContext } from '../context/AppContext';
import Gallery from './Gallery';
import Cart from '../components/Cart';

function Home() {

   const {
    productos,
    cargando,
    error,
    count,
    setCount,
    setProductList,
    openCart,
    setOpenCart,
    handleCount,
    groupedProducts,
  } = useAppContext();

  useEffect(() => {
    setOpenCart(false);
  }, []);

  const cartContainerStyle = {
    width: openCart ? "40%" : "0%",
    transition: "width 0.8s ease",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
  

  const galleryProps = {
    setCount,
    setProductList,
    productos,
    cargando,
    error,
    handleCount
  }

  const cartProps = {
    count,
    groupedProducts,
    setProductList,
    setCount
  }

  return (
    <main>
      <div style={mainContainerStyle}>
        <div style={{ width: openCart ? "60%" : "95%" }}>
          <Gallery {...galleryProps} />
        </div>
        {openCart &&
          <div style={cartContainerStyle}>
            <Cart {...cartProps} />
          </div>
        }
      </div>
    </main>
  );
}

const mainContainerStyle = {
  display: "flex",
  flexDirection: "row",
  wrap: "wrap",
  justifyContent: "space-between",
  padding: "40px",
  backgroundColor: "#ededed" 
}

export default Home;  