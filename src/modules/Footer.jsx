import React from 'react';
function Footer() {

  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 - Mi Aplicación React</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#f1f1f1",
  padding: "10px",
  textAlign: "center",
  color: "#000",
  marginTop: "20px"
};

export default Footer;  