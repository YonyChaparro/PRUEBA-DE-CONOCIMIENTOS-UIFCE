const API_URL = "http://localhost:3000/api/v1/prestamos";

//notificaciones flotantes
function showNotification(message) {
  const container = document.getElementById('notification-container');
const notification = document.createElement('div');
  notification.className = 'notification animate__animated animate__fadeInDown';
 notification.textContent = message;
  
  container.appendChild(notification);
  
  //eliminamos notificación después de 3 segundos
  setTimeout(() => {
   notification.classList.remove('animate__fadeInDown');
    notification.classList.add('animate__fadeOutUp');

   notification.addEventListener('animationend', () => {
      container.removeChild(notification);
    });
  }, 3000);
}

//envio del formulario
document.getElementById("prestamoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nuevoPrestamo = {
    nombre_estudiante: document.getElementById("nombre_estudiante").value,
    codigo_estudiante: document.getElementById("codigo_estudiante").value,
    email: document.getElementById("email").value,
    articulo: document.getElementById("articulo").value,
    observaciones: document.getElementById("observaciones").value
  };
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPrestamo)
    });
    const data = await res.json();

    if (res.ok) {
      showNotification("✅ Préstamo registrado con éxito");
      document.getElementById("prestamoForm").reset();
      cargarPrestamos();
    } else {
      showNotification("Error: " + data.error);
    }
  } catch (err) {
    showNotification("Error de conexión con el servidor");
  }
});

//cargamos los prestamos
async function cargarPrestamos() {
  try {
    const res = await fetch(API_URL);
    const prestamos = await res.json();

    const lista = document.getElementById("listaPrestamos");
    lista.innerHTML = "";

    prestamos.forEach(p => {
      const div = document.createElement("div");
      div.className = "prestamo";
      div.innerHTML = `
        <strong>ID:</strong> ${p.id}<br>
        <strong>Estudiante:</strong> ${p.nombre_estudiante}<br>
        <strong>Código:</strong> ${p.codigo_estudiante}<br>
        <strong>Email:</strong> ${p.email}<br>
        <strong>Artículo:</strong> ${p.articulo}<br>
        <strong>Observaciones:</strong> ${p.observaciones}
      `;
      lista.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    showNotification("Error al cargar los préstamos");
  }
}

window.addEventListener("load", cargarPrestamos);


//FONDO ESTRELLADO ANIMADO;;;;


const canvas = document.getElementById('starry-sky-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 500;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function Star() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.radius = Math.random() * 1.5;
  this.opacity = Math.random();
  this.speed = Math.random() * 0.005 + 0.001;
  this.vx = (Math.random() - 0.5) * 0.2;
  this.vy = (Math.random() - 0.5) * 0.2;
}

Star.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
  ctx.fill();
};

function animateStars() {
  requestAnimationFrame(animateStars);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;

    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }

    star.opacity += star.speed;
    if (star.opacity > 1 || star.opacity < 0) {
      star.speed *= -1;
    }

    star.draw();
  });
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();
initStars();
animateStars();