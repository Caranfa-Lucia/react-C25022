import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchProducts = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get('https://68081fa0942707d722dd5b68.mockapi.io/products/products');
        setProductos(respuesta.data);
      } catch (err) {
        setError('Hubo un problema al cargar los productos.');
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  return {
    productos,
    cargando,
    error
  };
};
