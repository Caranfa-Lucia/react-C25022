import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails'

const ProductDetailSection = () => {

    const location = useLocation();
    const { id, name, price, src, description } = location.state || {};

    const {
        handleCount,
        groupedProducts,
        handleIncrementItem,
        handleDecrementItem,
        handleRemoveItem,
    } = useAppContext();
    const quantity = groupedProducts.find(p => p.id === id)?.quantity || 0;

    const productDetailsProps = {
        id,
        name,
        description,
        price,
        image: src,
        handleCount,
        quantity,
        handleIncrementItem,
        handleDecrementItem,
        handleRemoveItem
    }

    return (
        <div>
            <ProductDetails {...productDetailsProps} />
        </div>
    )
}

export default ProductDetailSection