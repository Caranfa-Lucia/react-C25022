import React from 'react';
import ProductCard from '../components/ProductCard';

function Gallery({
  setCount = () => { },
  setProductList = () => { },
  handleCount = () => { },
  productos,
  loading,
  error
}) {

  return (
    <section style={galleryStyle}>
      {loading && <p>Cargando productos...</p>}
      {error &&
        <p>Ha ocurrido un error en la carga de productos, por favor, vuelve a intentar más tarde.</p>
      }
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          id={producto.id}
          src={producto.image}
          name={producto.name}
          price={producto.price}
          description={producto.description}
          setCount={setCount}
          setProductList={setProductList}
          handleCount={handleCount}
        />
      ))}
    </section>
  );
}

const galleryStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  justifyContent: "center",
  marginTop: "20px",
  with: "60%"
}

export default Gallery;  