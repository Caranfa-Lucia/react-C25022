/* COMPONENTE DEPRECADO DESPUÉS DE LA CLASE 12

import React, { useState, useEffect } from 'react';
import styled from "styled-components";

function EditProductForm({
    onEditing,
    selectedProduct,
    onClose
}) {
    const [productToEdit, setProductToEdit] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        image: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedProduct) {
            setProductToEdit(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductToEdit({ ...productToEdit, [name]: value });
    };

    const validarFormulario = () => {
        const newErrors = {};
        if (!productToEdit.name.trim()) {
            newErrors.name = 'El nombre es obligatorio.';
        }
        if (!productToEdit.price || productToEdit.price <= 0) {
            newErrors.price = 'El precio debe ser mayor a 0.';
        }
        if (!productToEdit.description.trim() || productToEdit.description.length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if (!productToEdit.image.trim()) {
            newErrors.image = 'La imagen es obligatoria.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        onEditing(productToEdit);
        setProductToEdit({ name: '', price: '', description: '', image: '' });
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <FormTitle>Editar Producto</FormTitle>
                <div onClick={() => onClose()} style={{ cursor: "pointer", fontSize: "20px" }}>
                    X
                </div>
            </div>
            <FormGroup>
                <Label>Nombre:</Label>
                <Input type="text" name="name" value={productToEdit.name} onChange={handleChange} />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Precio:</Label>
                <Input type="number" name="price" value={productToEdit.price} onChange={handleChange} min="0" />
                {errors.price && <ErrorText>{errors.price}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Descripción:</Label>
                <TextArea name="description" value={productToEdit.description} onChange={handleChange} />
                {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </FormGroup>

            <FormGroup>
                <Label>Imagen (URL):</Label>
                <Input type="text" name="image" value={productToEdit.image} onChange={handleChange} />
                {errors.image && <ErrorText>{errors.image}</ErrorText>}
            </FormGroup>

            <SubmitButton type="submit" >Actualizar</SubmitButton>
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

export default EditProductForm; */