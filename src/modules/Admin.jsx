import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormularioProducto from "../components/ProductForm";

const API_URL = 'https://68081fa0942707d722dd5b68.mockapi.io/products/products';

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProductos(data);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });

            if (!respuesta.ok) {
                throw new Error('Error al agregar producto');
            }

            const data = await respuesta.json();
            setProductos((prevProductos) => [...prevProductos, data]);
            alert('Producto agregado correctamente');
            setOpen(false);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <Title>Panel Administrativo</Title>
                    {error && <ErrorMessage>Hubo un error al cargar los productos.</ErrorMessage>}

                    <ProductGrid>
                        {productos.map((product) => (
                            <ProductCard key={`${product.id}-${product.name}`}>
                                <ProductImage src={product.image} alt={product.name} />
                                <ProductName>{product.name}</ProductName>
                                <ProductPrice>${product.price}</ProductPrice>
                                <ButtonGroup>
                                    <EditButton>Editar</EditButton>
                                    <DeleteButton>Eliminar</DeleteButton>
                                </ButtonGroup>
                            </ProductCard>
                        ))}
                    </ProductGrid>
                </>
            )}

            <AddButton onClick={() => setOpen(true)}>Agregar producto nuevo</AddButton>

            {open && <FormularioProducto onAgregar={agregarProducto} />}
        </Container>
    );
};

const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
`;

const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    margin-bottom: 20px;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
`;

const ProductCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 15px;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
`;

const ProductName = styled.h3`
    font-size: 1.1rem;
    font-weight: bold;
    margin: 10px 0 5px;
`;

const ProductPrice = styled.p`
    color: #555;
    font-weight: 500;
    margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const EditButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    background-color: #2196f3;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    background-color: #f44336;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
`;

const AddButton = styled.button`
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

export default Admin;