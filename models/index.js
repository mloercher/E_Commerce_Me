// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});
// Categories have many Products
Category.belongsToMany(Product, {
  foreignKey: 'product_id',
  through: Product
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: Product
});

// Tags belongToMany Products (through ProductTag)

Category.belongsToMany(Product, {
  foreignKey: 'product_id',
  through: ProductTag
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};