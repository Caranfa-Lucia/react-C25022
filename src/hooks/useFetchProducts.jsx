import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'https://68081fa0942707d722dd5b68.mockapi.io/products/products';

export const useFetchProducts = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerProductos = useCallback(async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get(API_URL);
      setProductos(respuesta.data);
    } catch (err) {
      setError('Hubo un problema al cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    productos,
    setProductos,
    setLoading,
    loading,
    error,
    obtenerProductos
  };
};