import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductDetails = ({
    id = 0,
    name = "",
    description = "",
    price = 0,
    image = "",
    count = 0,
    handleCount = () => { },
}) => {

    const [buttonHover, setButtonHover] = useState(false);

    const buttonStyle = {
        backgroundColor: buttonHover ? "#fff" : "#4ca996",
        color: buttonHover ? "#4ca996" : "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        marginTop: "20px",
        maxWidth: "140px",
        textAlign: "center",
        alignSelf: "flex-end"
    }

    return (
        <>
            <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "30px" }}>
                    {name}
                </div>
                <img
                    key={id}
                    src={image}
                    alt={`Imagen ${id + 1}`}
                    style={{ width: "300px", height: "300px", marginBottom: "20px" }}
                />
                <div style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "30px" }}>
                    $ {price}
                </div>
                <div style={{ fontSize: "14px", marginBottom: "30px" }}>
                    {description}
                </div>
                <div
                    style={buttonStyle}
                    onMouseEnter={() => setButtonHover(true)}
                    onMouseLeave={() => setButtonHover(false)}
                    onClick={() => handleCount(id, name, price)}>
                    Agregar al carrito
                </div>
                {count > 0 &&
                    <div style={payButtonStyle}>
                        <Link to="/cart" style={{ textDecoration: 'none', color: '#ededed' }}>Ir a pagar 
                        </Link>
                        <i className="la la-money-bill" style={{fontSize: "30px", marginLeft: "10px" }}></i>
                    </div>
                }
                <Link
                    to="/home"
                    style={{ textDecoration: 'none', color: '#6433a6', fontWeight: 600, marginTop: '30px', fontSize: '18px' }}
                >
                    <i className="la la-chevron-left"></i>
                    Volver
                </Link>
            </div>
        </>
    )
}

const payButtonStyle = {
    fontWeight: 600,
    fontSize: "18px",
    color: "#ededed",
    cursor: "pointer",
    backgroundColor: "#a2d2c7",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "20px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export default ProductDetails