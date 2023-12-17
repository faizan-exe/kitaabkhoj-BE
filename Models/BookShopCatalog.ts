



import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';
import BookShop from './BookShop';
import Book from './Book';

interface BookShopCatalogAttributes {
    id: number
    book_id: number
    bookshop_id: number
}

export interface BookShopCatalogInput extends Optional<BookShopCatalogAttributes, 'id'> { }

export interface BookShopCatalogOuput extends Required<BookShopCatalogAttributes> { }

class BookShopCatalog extends Model<BookShopCatalogAttributes, BookShopCatalogInput> implements BookShopCatalogAttributes {

    public id!: number
    public book_id: number
    public bookshop_id: number

}

BookShopCatalog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        book_id: {
            type: DataTypes.NUMBER,
            references: {
                model: Book,
                key: 'id'
            },
            allowNull: false
        },
        bookshop_id: {
            type: DataTypes.NUMBER,
            references: {
                model: BookShop,
                key: 'id'
            },
            allowNull: false

        },
       
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default BookShopCatalog;
