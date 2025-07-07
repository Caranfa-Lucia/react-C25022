import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';
import cart from '../images/cart.png';
import arrow from '../images/arrow.png';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components';
import logo from '../images/lulishop-logo.png';

function Nav() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin" || location.pathname === "/cart";

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    count,
    openCart,
    setOpenCart,
    isLoggedIn,
    setIsLoggedIn,
    showModal,
    setShowModal,
    setShowBlockedModal,
    isAdminLoggedIn,
    setIsAdminLoggedIn
  } = useAppContext();

  const handleAdminCartClick = () => {
    if (isAdminPage) {
      setOpenCart(!openCart);
      setShowBlockedModal(true);
    }
    setMenuOpen(false);
  };

  const handleCartClick = () => {
    if (location.pathname === "/cart") return;

    setOpenCart(prev => !prev);
    setMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    } else if (isAdminLoggedIn) {
      setIsAdminLoggedIn(false);
      localStorage.removeItem('isAdminLoggedIn');
    } else {
      setShowModal(true);
    }
    setMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <NavbarBrand>
        <Link
          to="/home"
          onClick={() => {
            handleLinkClick();
            setSearch("");
          }}
        >
          <img src={logo} alt="Lulishop Logo" height={"55px"} width={"150px"} />
        </Link>
      </NavbarBrand>

      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)} open={menuOpen}>
        <span />
        <span />
        <span />
      </HamburgerMenu>

      <NavList open={menuOpen}>
        <NavItem>
          <NavLink
            to="/home"
            $active={location.pathname === "/home"}
            onClick={() => {
              handleLinkClick();
              setSearch("");
            }}
          >
            Inicio</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/aboutUs" $active={location.pathname === "/aboutUs"} onClick={handleLinkClick}>Acerca de</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contactUs" $active={location.pathname === "/contactUs"} onClick={handleLinkClick}>Contacto</NavLink>
        </NavItem>
        <NavItem>
          <LoginLogoutLink onClick={handleLoginLogout}>
            {isLoggedIn || isAdminLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
          </LoginLogoutLink>
        </NavItem>
        {isAdminLoggedIn && (
          <NavItem>
            <NavLink
              to="/admin"
              $active={location.pathname === "/admin"}
              onClick={() => {
                handleLinkClick();
                setSearch("");
              }}
            >
              <i className="las la-user-secret" style={{ fontSize: "24px" }}></i>
              <AdminText>Admin</AdminText>
            </NavLink>
          </NavItem>
        )}
        <CartContainer>
          {!isAdminPage && (
            <ArrowIcon
              src={arrow}
              alt="flecha"
              $open={openCart}
              onClick={handleCartClick}
            />
          )}
          <CartImage
            src={cart}
            alt="carrito"
            onClick={isAdminPage ? handleAdminCartClick : handleCartClick}
          />
          <Counter>{count}</Counter>
        </CartContainer>
      </NavList>

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
    </NavbarContainer>
  );
}

export default Nav;


const NavbarContainer = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const NavbarBrand = styled.div`
  a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #ecf0f1;
    }
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 101;

  span {
    height: 3px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    display: flex;
    ${props => props.onClick && `
      & span:nth-child(1) {
        transform: ${props => props.open ? 'rotate(-45deg) translate(-5px, 6px)' : 'none'};
      }
      & span:nth-child(2) {
        opacity: ${props => props.open ? '0' : '1'};
      }
      & span:nth-child(3) {
        transform: ${props => props.open ? 'rotate(45deg) translate(-5px, -6px)' : 'none'};
      }
    `}
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    background-color: #2c3e50;
    position: absolute;
    top: 60px;
    left: 0;
    height: ${props => (props.open ? 'auto' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-in-out;
    padding-bottom: ${props => (props.open ? '20px' : '0')};
    box-shadow: ${props => (props.open ? '0 5px 10px rgba(0,0,0,0.1)' : 'none')};
  }
`;

const NavItem = styled.li`
  margin: 0 15px;

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: ${props => (props.$active ? '#82E0AA' : 'white')};
  text-decoration: none;
  font-size: 17px;
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #82E0AA;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 12px 0;
    font-size: 20px;
  }
`;

const LoginLogoutLink = styled.div`
  color: white;
  text-decoration: none;
  font-size: 17px;
  font-weight: normal;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #82E0AA;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 12px 0;
    font-size: 20px;
  }
`;


const AdminText = styled.span`
  margin-left: 5px;
`;

const CartContainer = styled.li`
  display: flex;
  align-items: center;
  background-color: #4a6784;
  border-radius: 25px;
  padding: 8px 15px;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin: 20px 0 0 0;
    justify-content: center;
    width: fit-content;
    align-self: center;
  }
`;

const ArrowIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
  transition: transform 0.3s ease;
  transform: ${props => (props.$open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const CartImage = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Counter = styled.div`
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 5px 8px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  min-width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;