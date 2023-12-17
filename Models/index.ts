// import User from './User'
import Book from './Book'
import BookShop from './BookShop'
import ShopKeeper from './ShopKeeper'
import BookShopCatalog from './BookShopCatalog'

BookShop.belongsTo(ShopKeeper, {
     foreignKey: 'shopkeeper_id'
});
ShopKeeper.hasOne(BookShop, {
    foreignKey: 'shopkeeper_id'
});


Book.belongsToMany(BookShop, { through: BookShopCatalog, foreignKey: 'book_id', targetKey: 'id' })
BookShop.belongsToMany(Book, { through: BookShopCatalog, foreignKey: 'bookshop_id', targetKey: 'id' })


export {Book, BookShop, ShopKeeper, BookShopCatalog}