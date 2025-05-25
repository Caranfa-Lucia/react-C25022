import React, { useState } from 'react';
import styled from "styled-components";

function FormularioProducto({ onAgregar }) {
    const [producto, setProducto] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.name.trim()) {
            nuevosErrores.name = 'El nombre es obligatorio.';
        }
        if (!producto.price || producto.price <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        if (!producto.description.trim() || producto.description.length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if (!producto.image.trim()) {
            nuevosErrores.image = 'La imagen es obligatoria.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        onAgregar(producto);
        setProducto({ name: '', price: '', description: '', image: '' });
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormTitle>Agregar Producto</FormTitle>

            <FormGroup>
                <Label>Nombre:</Label>
                <Input type="text" name="name" value={producto.name} onChange={handleChange} />
                {errores.name && <ErrorText>{errores.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Precio:</Label>
                <Input type="number" name="price" value={producto.price} onChange={handleChange} min="0" />
                {errores.price && <ErrorText>{errores.price}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Descripción:</Label>
                <TextArea name="description" value={producto.description} onChange={handleChange} />
                {errores.description && <ErrorText>{errores.description}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Imagen (URL):</Label>
                <Input type="text" name="image" value={producto.image} onChange={handleChange} />
                {errores.image && <ErrorText>{errores.image}</ErrorText>}
            </FormGroup>

            <SubmitButton type="submit">Agregar Producto</SubmitButton>
        </FormContainer>
    );
}

const FormContainer = styled.form`
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    min-height: 80px;
`;

const ErrorText = styled.p`
    color: #e53935;
    font-size: 0.9rem;
    margin-top: 5px;
`;

const SubmitButton = styled.button`
    width: 100%;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 12px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #43a047;
    }
`;

export default FormularioProducto;