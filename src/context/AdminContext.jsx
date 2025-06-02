import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const API_URL = 'https://68081fa0942707d722dd5b68.mockapi.io/products/products';

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEdition, setIsEdition] = useState(false);

    // Fetch de productos al montar el componente
    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProducts(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const addProduct = async (producto) => {
        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            setOpen(false);
            if (!respuesta.ok) {
                throw new Error('Error al agregar producto');
            }

            const data = await respuesta.json();
            setProducts((prevProducts) => [...prevProducts, data]);
            alert('Producto agregado correctamente');
        } catch (error) {
            console.log(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }
            alert('Producto eliminado correctamente');
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const saveEditedProduct = async (product) => {
        try {
            const response = await fetch(`${API_URL}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            setOpen(false);
            if (!response.ok) {
                throw new Error('Error al editar producto');
            }

            const updatedProduct = await response.json();
            alert('Producto editado correctamente');

            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            );
        } catch (error) {
            console.error("Error al editar producto:", error);
        }
    };

    return (
        <AdminContext.Provider value={{
            isEdition,
            products,
            loading,
            error,
            open,
            addProduct,
            deleteProduct,
            saveEditedProduct,
            setIsEdition,
            setOpen
        }}>
            {children}
        </AdminContext.Provider>
    );
};