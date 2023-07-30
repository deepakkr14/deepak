const db = require("../util/database");
const cart = require("./cart");
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES(?,?,?,?)',
    [this.title,this.price,this.imageUrl,this.description]);
  }

  static delete(id) {
    return db.execute('DELETE FROM products WHERE id = ?',[id])
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findmyid(id) {
    return db.execute('SELECT * FROM products WHERE id=?',
    [id])
  }
};
