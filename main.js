const fs = requiere("fs").promises;
class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(Object) {
    if (!fs.existSync(this.fileName)) return null;
    const content = this.getAll();
    const id = content.length <= 0 ? 1 : content[content.length - 1].id + 1;
    content.push({ id: id, ...Object });
    this.saveObjects(content);
  }

  async getById(id) {
    const content = this.getAll();
    const object = content.find((contentId) => contentId === id);
    object == undefined
      ? console.log("No se encontro el objecto con el id: " + id)
      : object;
  }

  async getAll() {
    const content = fs.readFile(this.fileName, "utf-8");
    return content;
  }

  deleteById(id) {
    let content = this.getAll();
    content = content.filter((obj) => obj.id !== id);
    this.save(content);
  }

  deleteAll() {
    this.save([]);
  }
}
