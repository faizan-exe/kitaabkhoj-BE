// import User from './User'
import Book from './Book'
import BookShop from './BookShop'
import ShopKeeper from './ShopKeeper'
import BookShopCatalog from './BookShopCatalog'
import BookShopFinance from './BookShopFinance';
import BookMedia from './BookMedia';

BookShop.belongsTo(ShopKeeper, {
     foreignKey: 'shopkeeper_id'
});
ShopKeeper.hasOne(BookShop, {
    foreignKey: 'shopkeeper_id'
});

BookShopFinance.belongsTo(BookShop, {
    foreignKey: 'bookshop_id'
});
BookShop.hasOne(BookShopFinance, {
   foreignKey: 'bookshop_id'
});




Book.belongsToMany(BookShop, { through: BookShopCatalog, foreignKey: 'book_id', targetKey: 'id' })
BookShop.belongsToMany(Book, { through: BookShopCatalog, foreignKey: 'bookshop_id', targetKey: 'id' })


//the code below is sus
BookMedia.belongsTo(BookShop, {
    foreignKey: 'bookshop_id'
  });
  BookShop.hasMany(BookMedia, {
    foreignKey: 'bookshop_id'
  });
  
  BookMedia.belongsTo(Book, {
    foreignKey: 'book_id'
  });
  Book.hasMany(BookMedia, {
    foreignKey: 'book_id'
  });


export {Book, BookShop, ShopKeeper, BookShopCatalog, BookShopFinance, BookMedia}