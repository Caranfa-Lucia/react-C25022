import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({
    id = 0,
    price = 0,
    src = "",
    name = "",
    description = "",
    handleCount = () => { }
}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [buttonHover, setButtonHover] = useState(false);
    const [imageHover, setImageHover] = useState(false);

    const cardStyle = {
        width: "250px",
        height: "320px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: isHovered ? "#c2b1dc" : "#ddd0f1",
        boxShadow: "0 2px 4px rgba(66, 241, 206, 0.1)",
        marginBottom: "20px",
        textAlign: "center",
        transition: "background-color 0.3s ease",
        cursor: "pointer"
    };

    const textStyle = {
        fontSize: isHovered ? "20px" : "16px",
        color: isHovered ? "#fff" : "#333",
        transition: "color 0.3s ease"
    }

    const buttonStyle = {
        backgroundColor: buttonHover ? "#fff" : "#4ca996",
        color: buttonHover ? "#4ca996" : "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        marginTop: "20px"
    }

    const imageStyles = {
        width: imageHover ? "165px" : "150px",
        height: imageHover ? "165px" : "150px",
        marginBottom: "10px"
    }

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => { setIsHovered(true); setImageHover(true) }}
            onMouseLeave={() => { setIsHovered(false); setImageHover(false) }}
        >
            <img
                key={id}
                src={src}
                alt={`Imagen ${id + 1}`}
                style={imageStyles}
            />
            <div style={textStyle}>{name}</div>
            <div style={textStyle}>{`$ ${price}`}</div>
            <div style={{ paddingTop: '8px' }}></div>
            <Link to={`/productDetail/${id}`} state={{ id, name, price, src, description }} style={{ textDecoration: 'none', fontWeight: 600, color: isHovered ? '#501b8f' : '#4ca996' }}>+ Ver detalles</Link>
            <div style={buttonStyle}
                onMouseEnter={() => setButtonHover(true)}
                onMouseLeave={() => setButtonHover(false)}
                onClick={() => handleCount(id, name, price)}
            >
                Agregar al carrito
            </div>
        </div>
    );
};

export default ProductCard;