# 🛒 React E-commerce - Proyecto Final Talento Tech

Este repositorio contiene el código fuente de una tienda online desarrollada como proyecto final del curso de **React JS** en **Talento Tech**. El sitio fue desplegado en **Netlify** y cuenta con funcionalidades completas tanto para usuarios como para administradores.

## 🚀 Demo

🔗 [Ver sitio en vivo](https://react-c25022.netlify.app/)  
📦 [Repositorio en GitHub](https://github.com/Caranfa-Lucia/react-C25022)

---

## 🎯 Funcionalidades principales

### Cliente
- Navegación entre distintas secciones del e-commerce.
- Visualización de productos con detalles individuales.
- Carrito de compras funcional:
  - Agregar y quitar productos.
  - Persistencia del carrito (localStorage).
  - Cálculo automático del total.

### Panel Administrativo
- CRUD completo de productos (Crear, Leer, Editar, Eliminar).
- Formulario validado para creación y edición de productos.
- Interfaz amigable y organizada para gestión de catálogo.
- Interacción con una API simulada vía **MockAPI**.

---

## Usuarios registrados

CLIENTE

Username: Lucia  
Password: Ab1234

ADMINISTRADOR

Username: admin    
Password: admin

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **React JS**
- 🧭 **React Router DOM** para enrutamiento de vistas
- 💅 **Styled-components** para estilos encapsulados y dinámicos
- 📡 **MockAPI** como simulador de back-end (REST API)
- ☁️ **Netlify** para despliegue continuo

---

## 📂 Estructura del proyecto

```plaintext
📦 react-C25022
├── 📁 components       # Componentes reutilizables
├── 📁 pages            # Vistas del sitio (Home, Admin, etc.)
├── 📁 services         # Funciones para consumir API
├── 📁 styles           # Estilos globales y personalizados
├── 📁 utils            # Funciones auxiliares (helpers)
├── 📁 assets           # Imágenes y recursos estáticos
└── App.js             # Configuración de rutas
```
---

## 🧪 Cómo clonar y correr el proyecto localmente
```
   bash
git clone https://github.com/Caranfa-Lucia/react-C25022.git
cd react-C25022

npm install
npm run dev
```

El proyecto estará disponible en: http://localhost:5173

---

## 📌 Notas adicionales

- Este proyecto no cuenta con back-end propio, el manejo de productos se hace a través de [MockAPI](https://mockapi.io/).
- El diseño está centrado en la experiencia de usuario, adaptado a distintos tamaños de pantalla.
- Se aplicaron buenas prácticas de organización de carpetas, separación de lógica y reutilización de componentes.

---

## 🙋‍♀️ Autor

Desarrollado por [Lucía Caranfa](https://www.linkedin.com/in/lucia-caranfa/)  
Proyecto final para el curso de React JS en [Talento Tech](https://talentotech.com.ar)

---
