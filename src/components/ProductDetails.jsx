import React, { useState } from 'react'
import { ArrowLeft, ShoppingCart, CreditCard } from 'lucide-react'

const ProductDetails = ({
    id = 0,
    name = "",
    description = "",
    price = 0,
    image = "",
    count = 1,
    handleCount = () => { console.log('Producto agregado al carrito') },
}) => {
    const [buttonHover, setButtonHover] = useState(false)
    const [payHover, setPayHover] = useState(false)
    const [backHover, setBackHover] = useState(false)

    const Link = ({ to, children, className, style }) => (
        <a href="#" className={className} style={style} onClick={(e) => e.preventDefault()}>
            {children}
        </a>
    )

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        padding: '32px 16px'
    }

    const cardStyle = {
        maxWidth: '1024px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px'
    }

    const imageContainerStyle = {
        padding: '32px'
    }

    const imageWrapperStyle = {
        aspectRatio: '1',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
    }

    const detailsStyle = {
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const titleStyle = {
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '16px',
        lineHeight: '1.2'
    }

    const priceContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    }

    const priceStyle = {
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        fontWeight: 'bold',
        color: '#059669'
    }

    const badgeStyle = {
        fontSize: '0.75rem',
        color: '#6b7280',
        backgroundColor: '#f3f4f6',
        padding: '4px 8px',
        borderRadius: '9999px'
    }

    const descriptionStyle = {
        color: '#374151',
        lineHeight: '1.6',
        fontSize: '1.125rem',
        marginBottom: '32px'
    }

    const featuresGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    }

    const featureCardStyle = {
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        padding: '12px'
    }

    const featureLabelStyle = {
        fontSize: '0.875rem',
        color: '#6b7280'
    }

    const featureValueStyle = {
        fontWeight: '600',
        color: '#059669'
    }

    const buttonsContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    }

    const addToCartButtonStyle = {
        width: '100%',
        padding: '16px 24px',
        borderRadius: '16px',
        fontWeight: '600',
        fontSize: '1.125rem',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transform: buttonHover ? 'scale(1.02)' : 'scale(1)',
        backgroundColor: buttonHover ? 'white' : '#059669',
        color: buttonHover ? '#059669' : 'white',
        border: '2px solid #059669',
        cursor: 'pointer'
    }

    const payButtonStyle = {
        width: '100%',
        padding: '16px 24px',
        borderRadius: '16px',
        fontWeight: '600',
        fontSize: '1.125rem',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transform: payHover ? 'scale(1.02)' : 'scale(1)',
        backgroundColor: payHover ? '#1d4ed8' : '#2563eb',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    }

    const backButtonStyle = {
        width: '100%',
        padding: '12px 24px',
        borderRadius: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: backHover ? '#f3f4f6' : 'transparent',
        color: backHover ? '#1f2937' : '#6b7280',
        border: 'none',
        cursor: 'pointer'
    }

    const infoSectionStyle = {
        marginTop: '48px',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        maxWidth: '1024px',
        margin: '48px auto 0'
    }

    const infoTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '24px'
    }

    const infoGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
    }

    const infoCardStyle = {
        textAlign: 'center',
        padding: '16px',
        borderRadius: '16px'
    }

    const infoIconStyle = {
        fontSize: '3rem',
        marginBottom: '8px'
    }

    const infoCardTitleStyle = {
        fontWeight: '600',
        color: '#111827',
        marginBottom: '8px'
    }

    const infoCardDescStyle = {
        fontSize: '0.875rem',
        color: '#6b7280'
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={gridStyle}>

                    <div style={imageContainerStyle}>
                        <div style={imageWrapperStyle}>
                            <img
                                src={image}
                                alt={name}
                                style={imageStyle}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                    </div>

                    <div style={detailsStyle}>
                        <div>
                            <h1 style={titleStyle}>
                                {name}
                            </h1>

                            <div style={priceContainerStyle}>
                                <span style={priceStyle}>
                                    ${price.toLocaleString()}
                                </span>
                                <span style={badgeStyle}>
                                    IVA incluido
                                </span>
                            </div>

                            <p style={descriptionStyle}>
                                {description}
                            </p>

                            <div style={featuresGridStyle}>
                                <div style={featureCardStyle}>
                                    <div style={featureLabelStyle}>Envío</div>
                                    <div style={featureValueStyle}>Gratis</div>
                                </div>
                                <div style={featureCardStyle}>
                                    <div style={featureLabelStyle}>Garantía</div>
                                    <div style={featureValueStyle}>1 año</div>
                                </div>
                            </div>
                        </div>

                        <div style={buttonsContainerStyle}>
                            <button
                                style={addToCartButtonStyle}
                                onMouseEnter={() => setButtonHover(true)}
                                onMouseLeave={() => setButtonHover(false)}
                                onClick={() => handleCount(id, name, price, image)}
                            >
                                <ShoppingCart size={24} />
                                Agregar al carrito
                            </button>

                            {count > 0 && (
                                <Link to="/cart">
                                    <button
                                        style={payButtonStyle}
                                        onMouseEnter={() => setPayHover(true)}
                                        onMouseLeave={() => setPayHover(false)}
                                    >
                                        <CreditCard size={24} />
                                        Ir a pagar
                                    </button>
                                </Link>
                            )}

                            <Link to="/home">
                                <button
                                    style={backButtonStyle}
                                    onMouseEnter={() => setBackHover(true)}
                                    onMouseLeave={() => setBackHover(false)}
                                >
                                    <ArrowLeft size={20} />
                                    Volver a la tienda
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={infoSectionStyle}>
                <h2 style={infoTitleStyle}>Información adicional</h2>
                <div style={infoGridStyle}>
                    <div style={{ ...infoCardStyle, backgroundColor: '#ecfdf5' }}>
                        <div style={infoIconStyle}>🚚</div>
                        <h3 style={infoCardTitleStyle}>Envío gratis</h3>
                        <p style={infoCardDescStyle}>En compras superiores a $50</p>
                    </div>
                    <div style={{ ...infoCardStyle, backgroundColor: '#eff6ff' }}>
                        <div style={infoIconStyle}>🔒</div>
                        <h3 style={infoCardTitleStyle}>Compra segura</h3>
                        <p style={infoCardDescStyle}>Protección de datos garantizada</p>
                    </div>
                    <div style={{ ...infoCardStyle, backgroundColor: '#faf5ff' }}>
                        <div style={infoIconStyle}>💎</div>
                        <h3 style={infoCardTitleStyle}>Calidad premium</h3>
                        <p style={infoCardDescStyle}>Productos seleccionados</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails