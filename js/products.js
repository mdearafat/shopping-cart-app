"use strict";

//The products
class product {
  constructor(name, price, id, img) {
    this.name = name;
    this.price = price;
    this.id = id;
    this.img = img;
  }
}
const product1 = new product(
  "George Men’s Pique Polo Shirt",
  17.99,
  "product-1",
  "images/product-1"
);
const product2 = new product(
  "Dynamic Fleece Zip Hoodie",
  25.49,
  "product-2",
  "images/product-2"
);
const product3 = new product(
  "Skinny Built-In Flex Ripped Jeans for Men",
  45.99,
  "product-3",
  "images/product-3"
);
const product4 = new product(
  "pink denim sherpa jacket",
  67.49,
  "product-4",
  "images/product-4"
);
const product5 = new product(
  "Mens Fashion Simple Camouflage Pocket Tie...",
  36.99,
  "product-5",
  "images/product-5"
);
const product6 = new product(
  "Vintage Gap Spell Out Streetwear Pullover Hoodie",
  27.49,
  "product-6",
  "images/product-6"
);
//putting all the products in the array
const allProducts = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
];
export default allProducts;
