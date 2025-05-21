import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './modules/Header';
import Nav from './modules/Nav';
import Home from './modules/Home';
import AboutUs from './modules/AboutUs';
import ContactUs from './modules/ContactUs';
import Footer from './modules/Footer';
import ProductDetailSection from './modules/ProductDetailSection';
import Cart from './components/Cart';
import Admin from './modules/Admin';
import NotFound from './modules/NotFound';
import BlockedSectionModal from './components/BlockedSectionModal';
import ProtectedRoutes from './routes/ProtectedRoutes';
import './styles/App.css';

function App() {

  const CartComponent = () => {
    return (
      <ProtectedRoutes>
        <Cart />
      </ProtectedRoutes>
      )
  };

  const AdminComponent = () => {
    return (
      <ProtectedRoutes>
        <Admin />
      </ProtectedRoutes>
      )
  };

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/productDetail/:id" element={<ProductDetailSection />} />
        <Route path="/cart" element={<CartComponent/>}/>
        <Route path="/admin" element={<AdminComponent />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BlockedSectionModal />
      <Footer />
    </>
  );
}

export default App;

