import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from 'react-bootstrap/Pagination';
import { useAppContext } from '../context/AppContext';
import styled from 'styled-components';

function Gallery({
  setCount = () => { },
  setProductList = () => { },
  handleCount = () => { },
  productos = [],
  loading = false,
  error = false
}) {
  const { groupedProducts, handleIncrementItem, handleDecrementItem, handleRemoveItem } = useAppContext();
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
        {currentItems.map((producto) => {
          const found = groupedProducts.find(p => p.id === producto.id);
          const quantity = found ? found.quantity : 0;
          return (
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
              quantity={quantity}
              handleIncrementItem={handleIncrementItem}
              handleDecrementItem={handleDecrementItem}
              handleRemoveItem={handleRemoveItem}
            />
          );
        })}
      </div>
      <div>
        <PaginationWrapper>
          <Pagination>
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
        </PaginationWrapper>
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  .pagination {
    display: flex;
    gap: 8px;
    background: rgba(255,255,255,0.95);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.08);
    padding: 8px 18px;
    flex-wrap: wrap;
  }
  .page-item {
    border-radius: 50%;
    overflow: hidden;
    transition: background 0.2s;
    &.active .page-link {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.12);
      border: none;
    }
    &:not(.active) .page-link {
      background: #f3f4f6;
      color: #667eea;
      border: none;
      font-weight: 500;
      transition: background 0.2s, color 0.2s;
    }
    &:not(.active):hover .page-link {
      background: #e0e7ff;
      color: #4f46e5;
    }
    &.disabled .page-link {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  .page-link {
    border-radius: 50% !important;
    padding: 8px 16px;
    font-size: 1rem;
    min-width: 36px;
    text-align: center;
    border: none;
    outline: none;
    box-shadow: none;
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    .pagination {
      padding: 6px 4px;
      gap: 6px;
    }
    .page-link {
      padding: 6px 10px;
      font-size: 0.95rem;
      min-width: 28px;
    }
  }
`;

export default Gallery;  