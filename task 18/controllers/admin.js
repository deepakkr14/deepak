// const { Where } = require("sequelize/types/utils");
const Product = require("../models/product");
// const { where } = require("sequelize");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
  title: title,
  price:price,
  imageUrl:imageUrl,
  description:description,
  userId:req.user.id
 });
 then(()=>console.log("product created"))
 .catch(err=>console.log(err))
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user.getProducts({where:{id:prodId}})
// Product.findByPk(prodId)
.then(products => {
  const product=product[0];
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-Product",
      editing: editMode,
      product: product,
    });
  })
  .catch(err=>console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
 Product.findByPk(prodId)
 .then((product)=>{
  // Product.create({
   product.title= updatedTitle,
   product.price=updatedPrice,
   product.description=updatedDesc,
   product.imageUrl=updatedImageUrl;
   return product.save();
   })
   .then(result=>{console.log("upadte produsfd")
   res.redirect('/admin/products')
  })
  //  console.log("product created")
  .catch(err=>console.log(err))
  };
//   const updatedProduct = new Product(
//     prodId,
//     updatedTitle,
//     updatedImageUrl,
//     updatedDesc,
//     updatedPrice
//   );
//   updatedProduct.save();
//   res.redirect("/admin/products");
// };

exports.deleteProcuct = (req, res, next) => {
  const prodId = req.body.productId;
  //  Product.destroy({where:{ id:prodId}} )
  Product.findByPk(prodId)
  .then((product) => {return product.destroy()})
  .then(result => { console.log("DESTROYED PRODUCT");
    res.redirect("/admin/products")})
  .catch(err=>console.log(err)
  );
  
};

exports.getProducts = (req, res, next) => {
 
 req.user.getProducts()
  // Product.findAll()
  .then(products => {
    res.render("admin/products", {
      prods:products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  })
  .catch((err) => console.log(err));
};
