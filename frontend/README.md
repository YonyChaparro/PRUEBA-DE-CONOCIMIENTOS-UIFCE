# 🌌 Frontend — Gestión de Préstamos

Este es el **frontend** del proyecto de gestión de préstamos de la **Unidad de Informática**.  
Está implementado con **HTML, CSS y JavaScript puro**, sin frameworks externos, pero con efectos visuales usando **Animate.css** y un **fondo animado estrellado en canvas**.  

El frontend consume la API REST construida en Node.js (sin Express), disponible en el repositorio:  
👉 [PRUEBA-DE-CONOCIMIENTOS-UIFCE](https://github.com/YonyChaparro/PRUEBA-DE-CONOCIMIENTOS-UIFCE)

---

## 🚀 Características

- Formulario para registrar un nuevo préstamo.  
- Listado dinámico de préstamos consumiendo la API (`GET /api/v1/prestamos`).  
- Validación en cliente (HTML5 + regex en inputs).  
- Notificaciones flotantes animadas para éxito o error.  
- Diseño responsive y estilizado con tipografía **Crimson Pro**.  
- Efecto visual de **fondo estrellado animado en canvas**.  
- Animaciones con **Animate.css**.  

---

## 📦 Archivos principales

- **index.html** → estructura principal del frontend.  
- **styles.css** → estilos, incluyendo responsive y efecto glassmorphism.  
- **script.js** → lógica de conexión con la API, renderizado de préstamos y animación del fondo.  

---

## ⚙️ Requisitos

- Un navegador moderno (Chrome, Firefox, Edge).  
- Tener corriendo el **servidor backend** en `http://localhost:3000` (ver repositorio del backend).  

---

## ▶️ Ejecución

1. Clonar el repositorio completo:

```bash
git clone https://github.com/YonyChaparro/PRUEBA-DE-CONOCIMIENTOS-UIFCE.git


2. Entrar al directorio del frontend

```bash
cd PRUEBA-DE-CONOCIMIENTOS-UIFCE/frontend

3. Abrir `index.html` en el navegador (doble clic o abrir con el navegador).

4. Asegurarse de que el backend esté corriendo en `http://localhost:3000`.