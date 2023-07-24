const fs = require("fs");
class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(Object) {
    const content = await this.getAll();
    const id = content.length <= 0 ? 1 : content[content.length - 1].id + 1;
    content.push({ id: id, ...Object });
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(content, null, 2)
      );
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const content = await this.getAll();
      const object = content.find((cont) => cont.id === id);
      return object ? object : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.fileName, "utf-8");
      return content ? JSON.parse(content) : [];
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    let content = await this.getAll();
    content = content.filter((obj) => obj.id !== id);
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(content, null, 2)
    );
  }

  async deleteAll() {
    const content = [];
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(content, null, 2)
    );
  }
}

//CREAR ARCHIVO
const file = new Contenedor("productos.txt");

//AGREGAR REGISTROS
// const addEntry = async (obj) => {
//   console.log(await file.save(obj));
// };
// addEntry({
//   title: "ELDEN RING",
//   price: "60.00",
//   thumbnal:
//     "https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg?t=1683618443",
// // });
// addEntry({
//   title: "DEATH STRANDING",
//   price: "30.00",
//   thumbnal:
//     "https://cdn.akamai.steamstatic.com/steam/apps/1850570/header.jpg?t=1683196693",
// });
// addEntry({
//   title: "DEVIL MAY CRY 5",
//   price: "30.00",
//   thumbnal:
//     "https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg?t=1675151951",
// });

//TRAER TODOS LOS ELEMENTOS
// const getElements = async () => {
//   console.log(await file.getAll());
// };
// getElements();

//BUSCAR POR ID
// const getElement = async (id) => {
//   console.log(await file.getById(id));
// };
// getElement(1);

// //ELIMINAR POR ID
// const removeElement = async (id) => {
//   await file.deleteById(id);
// };
// removeElement(2);

// //ELIMINAR TODOS
// const removeElements = async () => {
//   await file.deleteAll();
// };
// removeElements();
