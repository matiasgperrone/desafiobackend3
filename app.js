const express = require("express");
const productManager = require("./productManager");

const app = express();
const puerto = 8080;

app.get("/", (req, res) => {
  res.send("Bienvenido a mi E-commerce");
});

app.get("/products", (req, res) => {
  const limit = parseInt(req.query.limit) || productManager.products.length;
  const productsLimit = productManager.products.slice(0, limit);
  res.send(productsLimit);
});

app.get("/products/:id", (req, res) => {
  res.send(productManager.getProductbyID(req.params.id));
});

app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto 8080.");
});
