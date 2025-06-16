import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

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

    return (
        <CardContainer
            onMouseEnter={() => { setIsHovered(true); setImageHover(true) }}
            onMouseLeave={() => { setIsHovered(false); setImageHover(false) }}
            $ishovered={isHovered}
        >
            <ImageContainer $ishovered={imageHover}>
                <ProductImage
                    key={id}
                    src={src}
                    alt={`Imagen ${id + 1}`}
                    $ishovered={imageHover}
                />
                <ImageOverlay $ishovered={imageHover} />
            </ImageContainer>

            <ContentContainer>
                <ProductName $ishovered={isHovered}>{name}</ProductName>
                <ProductPrice $ishovered={isHovered}>{`$ ${price}`}</ProductPrice>
                <DetailsLink
                    to={`/productDetail/${id}`}
                    state={{ id, name, price, src, description }}
                    $ishovered={isHovered}
                >
                    + Ver detalles
                </DetailsLink>

                <AddToCartButton
                    onMouseEnter={() => setButtonHover(true)}
                    onMouseLeave={() => setButtonHover(false)}
                    onClick={() => handleCount(id, name, price, src)}
                    $buttonhover={buttonHover}
                    $ishovered={isHovered}
                >
                    <ButtonText>Agregar al carrito</ButtonText>
                    <ButtonIcon>🛒</ButtonIcon>
                </AddToCartButton>
            </ContentContainer>
        </CardContainer>
    );
};
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const CardContainer = styled.div`
    width: 280px;
    height: 380px;
    background: ${({ $ishovered }) =>
        $ishovered
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.85)'
    };
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: ${({ $ishovered }) =>
        $ishovered
            ? '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(102, 126, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            : '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
    };
    border: 1px solid ${({ $ishovered }) =>
        $ishovered
            ? 'rgba(102, 126, 234, 0.3)'
            : 'rgba(255, 255, 255, 0.3)'
    };
    cursor: default;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
animation: ${css`${fadeIn}`} 0.6s ease-out;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(102, 126, 234, 0.1),
            transparent
        );
        transition: left 0.5s ease;
        z-index: 1;
    }
    
&:hover {
    transform: translateY(-8px) scale(1.02);
    animation: ${float} 3s ease-in-out infinite;
        
        &::before {
            left: 100%;
        }
    }
    
    @media (max-width: 768px) {
        width: 260px;
        height: 360px;
        padding: 1.25rem;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 180px;
    margin-bottom: 1rem;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${({ $ishovered }) =>
        $ishovered
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
            : 'transparent'
    };
        transition: all 0.3s ease;
        z-index: 2;
    }
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${({ $ishovered }) => $ishovered ? 'scale(1.1)' : 'scale(1)'};
    filter: ${({ $ishovered }) =>
        $ishovered
            ? 'brightness(1.1) contrast(1.1) saturate(1.2)'
            : 'brightness(1) contrast(1) saturate(1)'
    };
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $ishovered }) =>
        $ishovered
            ? 'linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
            : 'transparent'
    };
    opacity: ${({ $ishovered }) => $ishovered ? 1 : 0};
    transition: all 0.3s ease;
    z-index: 1;
`;

const ContentContainer = styled.div`
    position: relative;
    z-index: 3;
    text-align: center;
    height: calc(100% - 180px - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ProductName = styled.div`
    font-size: ${({ $ishovered }) => $ishovered ? '1.25rem' : '1.1rem'};
    font-weight: 600;
    color: ${({ $ishovered }) => $ishovered ? '#4c1d95' : '#374151'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 0.5rem;
    line-height: 1.3;
    
    background: ${({ $ishovered }) =>
        $ishovered
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'none'
    };
    ${({ $ishovered }) => $ishovered && `
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    `}
`;

const ProductPrice = styled.div`
    font-size: ${({ $ishovered }) => $ishovered ? '1.4rem' : '1.2rem'};
    font-weight: 700;
    color: ${({ $ishovered }) => $ishovered ? '#059669' : '#10b981'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 0.75rem;
    
${({ $ishovered }) => $ishovered && css`
    text-shadow: 0 2px 4px rgba(5, 150, 105, 0.3);
    animation: ${pulse} 2s ease-in-out infinite;
`}
`;

const DetailsLink = styled(Link)`
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    color: ${({ $ishovered }) => $ishovered ? '#6366f1' : '#8b5cf6'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    }
`;

const AddToCartButton = styled.div`
    background: ${({ $buttonhover, $ishovered }) => {
        if ($buttonhover) return 'rgba(255, 255, 255, 0.95)';
        return $ishovered
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    }};
    color: ${({ $buttonhover, $ishovered }) => {
        if ($buttonhover) return $ishovered ? '#667eea' : '#10b981';
        return '#ffffff';
    }};
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    backdrop-filter: blur(10px);
    border: 2px solid ${({ $buttonhover, $ishovered }) => {
        if ($buttonhover) return $ishovered ? '#667eea' : '#10b981';
        return 'transparent';
    }};
    box-shadow: ${({ $buttonhover }) =>
        $buttonhover
            ? '0 8px 25px rgba(0, 0, 0, 0.15)'
            : '0 4px 15px rgba(0, 0, 0, 0.1)'
    };
    
    &:hover {
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
        transform: translateY(0) scale(0.98);
    }
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
        );
        background-size: 200% 200%;
   animation: ${shimmer} 2s infinite;
        border-radius: 12px;
        opacity: ${({ $buttonhover }) => $buttonhover ? 0 : 1};
        transition: opacity 0.3s ease;
    }
`;

const ButtonText = styled.span`
    position: relative;
    z-index: 1;
`;

const ButtonIcon = styled.span`
    position: relative;
    z-index: 1;
    font-size: 1rem;
    transition: transform 0.3s ease;
    background: #fff;
    padding: 0.5rem;
    border-radius: 50%;
    
    ${AddToCartButton}:hover & {
        transform: scale(1.2) rotate(10deg);
    }
`;

export default ProductCard;