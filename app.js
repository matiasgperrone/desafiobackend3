const express = require("express");
const ProductManager = require("./productManager");
const productManager = new ProductManager("products.json");
const app = express();
const puerto = 8080;

app.get("/", (req, res) => {
  res.send("Bienvenido a mi E-commerce");
});

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = parseInt(req.params.pid);
  console.log("MIRA ACA", productId);
  const products = await productManager.getProductbyID(productId);
  res.json(products);
});

app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto 8080.");
});
