const brandData = require("../initial-data/brands.json");
const productData = require("../initial-data/products.json");
const userData = require("../initial-data/users.json");

class Sunglasses {
  static getBrands() {
    return brandData;
  }

  static getBrandProducts(id) {
    return productData.filter((product) => product.categoryId == id);
  }

  static getAllProducts() {
    return productData;
  }

  static getProducts(query) {
    const relatedProducts = productData.filter((product) => {
      return (
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    return relatedProducts;
  }

  static getCart(username) {
    return userData.find((user) => user.login.username == username).cart;
  }

  static findProduct(id) {
    return productData.find((product) => {
      return product.id === id;
    });
  }

  static addProduct(product, cart) {
    if (Array.isArray(cart) && !cart.length) {
      cart.push({
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      return cart;
    } else {
      let matchedItem = cart.find((item) => {
        return item.id === product.id;
      });
      if (matchedItem) {
        matchedItem.quantity++;
        return cart;
      } else {
        cart.push({
          id: product.id,
          categoryId: product.categoryId,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
        return cart;
      }
    }
  }

  static findProductInCart(productId, userCart) {
    return userCart.find((item) => item.id === productId);
  }

  static deleteProduct(productId, userCart) {
    let itemToRemoveIndex = userCart.findIndex((item) => item.id === productId);
    userCart.splice(itemToRemoveIndex, 1);
    return userCart;
  }

  static updateProduct(productId, quantity, userCart) {
    let matchedItem = userCart.find((item) => {
      return item.id === productId;
    });
    matchedItem.quantity = quantity;
    return userCart;
  }
}

module.exports = Sunglasses;