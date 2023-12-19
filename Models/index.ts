// import User from './User'
import Book from "./Book";
import BookShop from "./BookShop";
import ShopKeeper from "./ShopKeeper";
import BookShopCatalog from "./BookShopCatalog";
import BookShopFinance from "./BookShopFinance";
import BookMedia from "./BookMedia";
import Customer from "./Customer";
import CustomerFinance from "./CustomerFinance";
import Order from "./Order";

BookShop.belongsTo(ShopKeeper, {
  foreignKey: "shopkeeper_id",
});
ShopKeeper.hasOne(BookShop, {
  foreignKey: "shopkeeper_id",
});

BookShopFinance.belongsTo(BookShop, {
  foreignKey: "bookshop_id",
});
BookShop.hasOne(BookShopFinance, {
  foreignKey: "bookshop_id",
});

CustomerFinance.belongsTo(Customer, {
  foreignKey: "customer_id",
});

Customer.hasOne(CustomerFinance, {
  foreignKey: "customer_id",
});

Book.belongsToMany(BookShop, {
  through: BookShopCatalog,
  foreignKey: "book_id",
  targetKey: "id",
});
BookShop.belongsToMany(Book, {
  through: BookShopCatalog,
  foreignKey: "bookshop_id",
  targetKey: "id",
});

//the code below is sus
BookMedia.belongsTo(BookShopCatalog, {
  foreignKey: "bookshopcatalog_id",
});

BookShopCatalog.hasOne(BookMedia, {
  foreignKey: "bookshopcatalog_id",
});

Order.belongsTo(BookShopCatalog, {
  foreignKey: "bookshopcatalog_id",
});
BookShopCatalog.hasMany(Order, {
  foreignKey: "bookshopcatalog_id",
});

Order.belongsTo(Customer, {
  foreignKey: "customer_id",
});
Customer.hasMany(Order, {
  foreignKey: "customer_id",
});

BookShopCatalog.belongsTo(Book, { foreignKey: "book_id" });
Book.hasMany(BookShopCatalog, { foreignKey: "book_id" });

BookShopCatalog.belongsTo(BookShop, { foreignKey: "bookshop_id" });
BookShop.hasMany(BookShopCatalog, { foreignKey: "bookshop_id" });

// BookMedia.belongsTo(BookShop, {
//     foreignKey: 'bookshop_id'
//   });
//   BookShop.hasMany(BookMedia, {
//     foreignKey: 'bookshop_id'
//   });

//   BookMedia.belongsTo(Book, {
//     foreignKey: 'book_id'
//   });
//   Book.hasMany(BookMedia, {
//     foreignKey: 'book_id'
//   });

export {
  Book,
  BookShop,
  ShopKeeper,
  BookShopCatalog,
  BookShopFinance,
  BookMedia,
  Customer,
  CustomerFinance,
  Order,
};
