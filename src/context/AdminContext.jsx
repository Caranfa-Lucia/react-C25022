import React, { createContext, useState } from 'react';
import { toast } from "react-toastify";
import { useAppContext } from './AppContext';

export const AdminContext = createContext();

const API_URL = 'https://68081fa0942707d722dd5b68.mockapi.io/products/products';

export const AdminProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const { loading, error, obtenerProductos } = useAppContext();

    const addProduct = async (producto) => {
        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
            if (!respuesta.ok) throw new Error('Error al agregar producto');

            await obtenerProductos();

            toast.success("Producto agregado al carrito!");
        } catch (error) {
            console.error(error);
            toast.error("Error al agregar producto.");
        } finally {
            setOpen(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al eliminar producto');

            await obtenerProductos();

            toast.success("Producto eliminado correctamente!");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar producto.");
        }
    };

    const saveEditedProduct = async (product) => {
        try {
            const response = await fetch(`${API_URL}/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            if (!response.ok) throw new Error('Error al editar producto');

            await obtenerProductos();

            toast.success("Producto editado correctamente!");
        } catch (error) {
            console.error(error);
            toast.error("Error al editar producto.");
        } finally {
            setOpen(false);
        }
    };

    return (
        <AdminContext.Provider value={{
            open,
            loading,
            error,
            setOpen,
            addProduct,
            deleteProduct,
            saveEditedProduct
        }}>
            {children}
        </AdminContext.Provider>
    );
};