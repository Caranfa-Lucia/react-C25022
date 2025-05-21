import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails'

const ProductDetailSection = () => {
    
    const location = useLocation();
    const { id, name, price, src, description } = location.state || {};

     const {
        count,
        handleCount,
      } = useAppContext();

    const productDetailsProps = {
        id,
        name,
        description,
        price,
        image: src,
        handleCount,
        count
    }

    return (
        <div>
            <ProductDetails {...productDetailsProps} />
        </div>
    )
}

export default ProductDetailSection