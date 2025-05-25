import React from 'react';
function Footer() {

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 - Mi Aplicación React - Caranfa Lucía, comisión 25022</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#f1f1f1",
  padding: "50px 10px",
  textAlign: "center",
  color: "#000",
};

export default Footer;  