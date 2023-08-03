const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieidData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "all products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findmyid(prodId)
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product[0].title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products=>{
    res.render("shop/product-list", {
    prods:products[0],
    pageTitle: "all products",
    path: "/products",
  })}
  );
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findmyid(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  // console.log(prodId);
  res.redirect("/cart");
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
