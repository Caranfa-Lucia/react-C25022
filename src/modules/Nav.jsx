import { useAppContext } from '../context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cart from '../images/cart.png';
import arrow from '../images/arrow.png';
import LoginModal from '../components/LoginModal';

function Nav() {

  const location = useLocation();
  const navigate = useNavigate();
  const isNotHomePage = location.pathname !== "/home";

  const {
    count,
    openCart,
    setOpenCart,
    isLoggedIn,
    setIsLoggedIn,
    showModal,
    setShowModal,
    isAdminLoggedIn,
    setIsAdminLoggedIn
  } = useAppContext();

  const arrowStyle = {
    cursor: "pointer",
    paddingTop: openCart ? "10px" : "0px",
    paddingBottom: openCart ? "0px" : "10px",
    transition: "transform 0.3s ease",
    transform: !openCart ? "rotate(180deg)" : "rotate(0deg)",
  };

  const handleCartClick = () => {
    if (!isNotHomePage) {
      setOpenCart(!openCart);
    } else {
      navigate('/cart');
    }
  };

  const getLinkStyle = (path) => ({
    ...navbarListItem,
    fontSize: location.pathname === path ? "32px" : "16px",
  });

  return (
    <nav style={navbarStyle}>
      <ul style={navbarList}>
        <li><Link to="/home" style={getLinkStyle("/home")}> Inicio</Link></li>
        <li><Link to="/aboutUs" style={getLinkStyle("/aboutUs")}>Acerca de</Link></li>
        <li><Link to="/contactUs" style={getLinkStyle("/contactUs")}>Contacto</Link></li>
        <li style={navbarListItem} >
          <div onClick={() => {
            if (isLoggedIn) {
              setIsLoggedIn(false);
              localStorage.removeItem('isLoggedIn');
            } else if (isAdminLoggedIn) {
              setIsAdminLoggedIn(false);
              localStorage.removeItem('isAdminLoggedIn');
            } else {
              setShowModal(true);
            }
          }}>
            {isLoggedIn || isAdminLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </div>
        </li>
        {isAdminLoggedIn &&
          <li>
            <Link to="/admin" style={getLinkStyle("/admin")}>
              <i className="las la-user-secret" style={{ fontSize: "48px" }}></i>
            </Link>
          </li>
        }
        <li>
          <div style={{
            display: "flex",
            flexDirection: "row",
            wrap: "wrap",
            backgroundColor: "#ededed",
            borderRadius: "20px",
            padding: "10px"
          }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {!isNotHomePage &&
                <img
                  src={arrow}
                  alt="flecha"
                  width="50px"
                  height="50px"
                  style={arrowStyle}
                  onClick={handleCartClick}
                />
              }
              <img
                src={cart}
                alt="carrito"
                width="60px"
                height="60px"
                style={{ cursor: "pointer" }}
                onClick={handleCartClick}
              />
            </div>
            <div style={counterStyle}>
              {count}
            </div>
          </div>
        </li>
      </ul>
      {showModal && (
        <LoginModal
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          showModal={showModal}
          setShowModal={setShowModal}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
        />
      )}
    </nav>
  );
}

const navbarStyle = {
  backgroundColor: "#333",
  color: "white",
  padding: "10px",
  textAlign: "center"
};

const navbarList = {
  listStyle: "none",
  display: "flex",
  justifyContent: "space-around",
  margin: 0,
  alignItems: "center"
}

const navbarListItem = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "16px"
}

const counterStyle = {
  border: "2px solid #000",
  borderRadius: "50px",
  padding: "10px",
  backgroundColor: "#f1f1f1",
  textAlign: "center",
  width: "30px",
  height: "30px",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#333"
}

export default Nav; 