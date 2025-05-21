import React, { useState } from 'react';

const ContactUs = () => {
    const [nombre, setNombre] = useState('');
    function manejarEnvio(evento) {
        evento.preventDefault();
        alert(`Formulario enviado por: ${nombre}`);
    }
    return (
        <>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Formulario de contacto</h2>
        </div>
        <form onSubmit={manejarEnvio} style={{ textAlign: "center", minHeight: "70vh", marginTop: "50px" }}>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
            />
            <button type="submit">Enviar</button>
        </form>
        </>
    );
  }

export default ContactUs

