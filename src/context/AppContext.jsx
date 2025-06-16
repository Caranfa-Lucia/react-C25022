import { createContext, useContext, useState, useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [productList, setProductList] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showBlockedAdminModal, setShowBlockedAdminModal] = useState(false);
  const [search, setSearch] = useState("")

  const {
    productos,
    loading,
    error,
    setProductos,
    obtenerProductos
  } = useFetchProducts();

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') setIsLoggedIn(true);

    const storedAdminLogin = localStorage.getItem('isAdminLoggedIn');
    if (storedAdminLogin === 'true') setIsAdminLoggedIn(true);

    const storedGroupedProducts = localStorage.getItem('groupedProducts');
    if (storedGroupedProducts) {
      const parsed = JSON.parse(storedGroupedProducts);
      const reconstructed = parsed.flatMap(p =>
        Array(p.quantity).fill({ id: p.id, name: p.name, price: p.price, image: p.image })
      );
      setProductList(reconstructed);
      setCount(reconstructed.length);
    }

    setAuthLoading(false);
  }, []);

  useEffect(() => {
  if (!productos || productos.length === 0) return;

  setProductList((prevList) => {
    const updatedList = prevList.filter(product =>
      productos.some(p => p.id === product.id)
    );
    setCount(updatedList.length);
    return updatedList;
  });
}, [productos]);

  const handleCount = (id, name, price, image) => {
    const newProduct = { id, name, price, image };
    setCount(prev => prev + 1);
    setProductList(prev => [...prev, newProduct]);
  };

  const handleRemoveItem = (productId) => {
    setProductList((prevList) => {
      const updatedList = prevList.filter(product => product.id !== productId);
      setCount(updatedList.length);
      return updatedList;
    });
  };

  const handleClearCart = () => {
    setProductList([]);
    setCount(0);
    localStorage.removeItem('groupedProducts');
  };

  const handleIncrementItem = (productId) => {
    const existingProduct = productList.find(product => product.id === productId);
    
    if (existingProduct) {
      const newProduct = { 
        id: existingProduct.id, 
        name: existingProduct.name, 
        price: existingProduct.price, 
        image: existingProduct.image 
      };
      setProductList(prev => [...prev, newProduct]);
      setCount(prev => prev + 1);
    }
  };

  const handleDecrementItem = (productId) => {
    setProductList((prevList) => {
      const productIndex = prevList.findIndex(product => product.id === productId);
      
      if (productIndex !== -1) {
        const updatedList = [
          ...prevList.slice(0, productIndex),
          ...prevList.slice(productIndex + 1)
        ];
        setCount(updatedList.length);
        return updatedList;
      }
      
      return prevList;
    });
  };

  const productMap = productList.reduce((acc, product) => {
  const existing = acc[product.id];
  if (!existing) {
    acc[product.id] = { id: product.id, quantity: 1 };
  } else {
    acc[product.id].quantity += 1;
  }
  return acc;
}, {});

const groupedProducts = Object.values(productMap).map(({ id, quantity }) => {
  const currentProduct = productos.find(p => p.id === id);
  return {
    id,
    name: currentProduct?.name || "Producto desconocido",
    price: currentProduct?.price || 0,
    image: currentProduct?.image || "",
    quantity
  };
});

  useEffect(() => {
    if (groupedProducts.length > 0) {
      localStorage.setItem('groupedProducts', JSON.stringify(groupedProducts));
    } else {
      localStorage.removeItem('groupedProducts');
    }
  }, [groupedProducts]);

  const productFilter = productos.filter((producto) => producto?.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppContext.Provider
      value={{
        productos,
        setProductos,
        loading,
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
        handleRemoveItem,
        handleClearCart,
        handleIncrementItem,  
        handleDecrementItem,  
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        showBlockedAdminModal,
        setShowBlockedAdminModal,
        obtenerProductos,
        search,
        setSearch,
        productFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);