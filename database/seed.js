const db = require('./database.js');
const faker = require('faker');

let producer = () => {
  let product = {};

  product.product_name =  null;
  product_name =  null;
  seller =  null;
  price =  null;
  rating =  null;
  product_code =  null;

  return product;
}

for (let i = 0; i < 100; i++) {
  db.insertProduct(producer());
}