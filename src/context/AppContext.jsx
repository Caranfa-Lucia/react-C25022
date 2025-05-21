import { createContext, useContext, useState, useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { users } from '../assets/users';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const { productos, cargando, error } = useFetchProducts();

    useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') setIsLoggedIn(true);

const storedGroupedProducts = localStorage.getItem('groupedProducts');
if (storedGroupedProducts) {
  const parsed = JSON.parse(storedGroupedProducts);
      const reconstructed = parsed.flatMap(p =>
        Array(p.quantity).fill({ id: p.id, name: p.name, price: p.price })
      );
      setProductList(reconstructed);
      setCount(reconstructed.length);
    }

    setAuthLoading(false);
  }, []);

  const handleCount = (id, name, price) => {
    const newProduct = { id, name, price };
    setCount(prev => prev + 1);
    setProductList(prev => [...prev, newProduct]);
  };

  const handleClearCart = () => {
    setProductList([]);
    setCount(0);
    localStorage.removeItem('groupedProducts');
  };

  const productMap = productList.reduce((acc, product) => {
    const { id, name, price } = product;
    if (!acc[id]) {
      acc[id] = { id, name, price, quantity: 1 };
    } else {
      acc[id].quantity += 1;
    }
    return acc;
  }, {});

  const groupedProducts = Object.values(productMap);

  useEffect(() => {
  if (groupedProducts.length > 0) {
    localStorage.setItem('groupedProducts', JSON.stringify(groupedProducts));
  } else {
    localStorage.removeItem('groupedProducts');
  }
}, [groupedProducts]);

  return (
    <AppContext.Provider
      value={{
        users,
        productos,
        cargando,
        error,
        count,
        setCount,
        productList,
        setProductList,
        openCart,
        setOpenCart,
        isLoggedIn,
        setIsLoggedIn,
        showModal,
        setShowModal,
        showBlockedModal,
        setShowBlockedModal,
        authLoading,
        handleCount,
        groupedProducts,
        handleClearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);