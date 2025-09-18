const http = require("http");

const PORT = 3000;
let prestamos = [];

//headers de los Cors
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, data) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

//validamos email
function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

//creamos el servidor
const server = http.createServer((req, res) => {
  setCorsHeaders(res);
  const urlParts = req.url.split("/").filter(Boolean);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (urlParts[0] === "api" && urlParts[1] === "v1" && urlParts[2] === "prestamos") {
    //listamos los préstamos
    if (req.method === "GET") {
      return sendJson(res, 200, prestamos);
    }
    //nuevo préstamo
    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const data = JSON.parse(body);

          //validamos los campos
          if (!data.nombre_estudiante || !data.codigo_estudiante || !data.email || !data.articulo) {
            return sendJson(res, 400, { error: "Todos los campos obligatorios deben estar presentes" });
          }
          if (!/^\d{8}$/.test(data.codigo_estudiante)) {
            return sendJson(res, 400, { error: "El codigo  del estudiante debe ser numérico de 8 dígitos" });
          }

          if (!validarEmail(data.email)) {
            return sendJson(res, 400, { error: "El email no es válido" });
          }
          if (data.observaciones && data.observaciones.length > 100) {
            return sendJson(res, 400, { error: "Las observaciones no  pueden superar los 100 caracteres" });
          }

          //guardamos el préstamo
          const nuevoPrestamo = {
            id: prestamos.length + 1,
            nombre_estudiante: data.nombre_estudiante,
            codigo_estudiante: data.codigo_estudiante,
            email: data.email,
            articulo: data.articulo,
            observaciones: data.observaciones || ""
          };
          prestamos.push(nuevoPrestamo);
          return sendJson(res, 201, nuevoPrestamo);

        } catch (err) {
          return sendJson(res, 400, { error: "JSON inválido" });
        }
      });

      return;
    }
  }

  //el enpoint no exite
  sendJson(res, 404, { error: "Endpoint no encontrado" });
});

//iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
