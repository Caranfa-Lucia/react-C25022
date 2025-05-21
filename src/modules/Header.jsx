import React from 'react';
function Header() {

    const headerStyle = {
        backgroundColor: "#5d2baa",
        padding: "10px",
        textAlign: "center",
        color: "white"
    };

    return (
        <>
            <header style={headerStyle}>
                <h1>Proyecto React - Ecommerce 25022 - Caranfa Lucia</h1>
            </header>
        </>
    );
}
export default Header;