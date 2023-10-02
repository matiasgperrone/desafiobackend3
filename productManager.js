const { log } = require("console");
const { promises: fs } = require("fs");
// CLASE CON CONSTRUCTOR Y ARREGLO VACIO

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }
    const products = await getJSONFromFile(this.path);
    const id = Date.now();
    const NewProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    products.push(NewProduct);
    await saveJSONToFile(this.path, products);
  }

  getProducts() {
    return getJSONFromFile(this.path);
  }

  async getProductbyID(id) {
    const products = await getJSONFromFile(this.path);
    let productsFind = products.find((item) => item.id === id);
    if (!productsFind) {
      console.log("GETPRODUCTBYID: El producto no se encuentra");
    } else {
      console.log("GETPRODUCTBYID: Producto encontrado: ", productsFind);
    }
  }

  async deteleProductByID(id) {
    try {
      const products = await getJSONFromFile(this.path);
      let productsFind = products.find((item) => item.id === id);
      let index = products.indexOf(productsFind);
      if (index !== -1) {
        products.splice(index, 1);
        await saveJSONToFile(this.path, products);
        console.log("Producto eliminado. Este es el nuevo arreglo:", products);
      } else {
        console.log("no se encuentra el producto");
      }
    } catch (error) {
      console.log("error", error.message);
    }
  }

  async updateProductByID(
    id,
    newTitle,
    newDescription,
    newPrice,
    newThumbnail,
    newCode,
    newStock
  ) {
    try {
      const products = await getJSONFromFile(this.path);
      let productFind = products.find((item) => item.id === id);
      let index = products.indexOf(productFind);
      if (index !== -1) {
        productFind = {
          title: newTitle,
          description: newDescription,
          price: newPrice,
          thumbnail: newThumbnail,
          code: newCode,
          stock: newStock,
        };
        products[index] = { id, ...productFind };
        await saveJSONToFile(this.path, products);
        console.log("Producto cambiado", products);
      } else {
        console.log("no se encuentra el producto");
      }
    } catch (error) {
      console.log("Error en UPDATE", error.message);
    }
  }
}

// UTILITY FUNCTIONS

// Get information in JSON and transform it to JavaScript

const getJSONFromFile = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    return [];
  }
  const content = await fs.readFile(path, "utf-8");
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
  }
};

// Write information in JavaScript, transform it to JSON

const saveJSONToFile = async (path, data) => {
  const content = JSON.stringify(data, null, "\t");
  try {
    await fs.writeFile(path, content, "utf-8");
  } catch (error) {
    throw new Error(`El archivo ${path} no pudo ser escrito.`);
  }
};

// PARA PROBAR CADA UNA DE LAS FUNCIONES LAS APLIQUE POR SEPARADO, POR LO QUE HAY QUE
// DESCOMENTAR CADA BLOQUE DE CODIGO SEPARADO POR ///////////////////////////////////

// PRUEBA DE ADD Y GET PRODUCT

// const addAndGet = async () => {
//   try {
//     const productManager = new ProductManager("./products.json");
//     await productManager.addProduct({
//       title: "Crocs",
//       description: "Crocs azules",
//       price: 13400,
//       thumbnail: "URL de Crocs",
//       code: 2,
//       stock: 90,
//     });
//     console.log("ADDPRODUCT: Se agregó el producto");
//     const products = await productManager.getProducts();
//     console.log("GETPRODUCT: Estos son los productos:", products);
//   } catch (error) {
//     console.error(" Ha ocurrido un error", error.message);
//   }
// };
// addAndGet();

/////////////////////////////////////////////////////////////////

// PRUEBA DE GET PRODUCT BY ID CON ID 3

// const getProdbyID = async () => {
//   try {
//     const productManager = new ProductManager("./products.json");
//     await productManager.getProductbyID(3);
//   } catch (error) {
//     console.log("GETPRODUCTBYID: Ocurrió un error", error.message);
//   }
// };
// getProdbyID();

/////////////////////////////////////////////////////////////////

// PRUEBA DE DELETE PRODUCT BY ID CON EL ID 1

// const deleteProd = async () => {
//   try {
//     const productManager = new ProductManager("./products.json");
//     await productManager.deteleProductByID(1);
//   } catch (error) {
//     console.log("error", error.message);
//   }
// };

// deleteProd();

/////////////////////////////////////////////////////////////////

// PRUEBA DE UPDATE PRODUCT BY ID CON EL PRODUCTO ID 2

// const updateProd = async () => {
//   const productManager = new ProductManager("./products.json");
//   await productManager.updateProductByID(
//     2,
//     "Zapatillas",
//     "Zapatillas Nike",
//     35000,
//     "URL de Nike",
//     20,
//     2
//   );
// };
// updateProd();

/////////
