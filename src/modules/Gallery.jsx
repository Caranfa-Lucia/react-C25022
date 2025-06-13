import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from 'react-bootstrap/Pagination';

function Gallery({
  setCount = () => { },
  setProductList = () => { },
  handleCount = () => { },
  productos,
  loading,
  error
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPage = Math.ceil(productos.length / itemsPerPage);

  return (
    <section >
      <div style={galleryStyle}>
        {loading && <p>Cargando productos...</p>}
        {error &&
          <p>Ha ocurrido un error en la carga de productos, por favor, vuelve a intentar más tarde.</p>
        }
        {currentItems.map((producto) => (
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
      </div>
      <div>
        <Pagination style={paginationStyle}>
          <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
          {
            Array.from({ length: totalPage }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))
          }
          <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPage))} disabled={currentPage === totalPage} />
        </Pagination>
      </div>
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

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
  marginBottom: "50px"
};

export default Gallery;  