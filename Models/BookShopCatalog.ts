



import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';
import BookShop from './BookShop';
import Book from './Book';

interface BookShopCatalogAttributes {
    id: number
    book_id: number
    bookshop_id: number
    in_stock: number
    sold_copies: number
    unit_price: number
    used: boolean
}

export interface BookShopCatalogInput extends Optional<BookShopCatalogAttributes, 'id'> { }

export interface BookShopCatalogOuput extends Required<BookShopCatalogAttributes> { }

class BookShopCatalog extends Model<BookShopCatalogAttributes, BookShopCatalogInput> implements BookShopCatalogAttributes {

    public id!: number
    public book_id: number
    public bookshop_id: number
    public in_stock: number
    public sold_copies: number
    public unit_price: number
    public used: boolean

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

}

BookShopCatalog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'id'
            },
            allowNull: false
        },
        bookshop_id: {
            type: DataTypes.INTEGER,
            references: {
                model: BookShop,
                key: 'id'
            },
            allowNull: false

        },

        in_stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        sold_copies: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        unit_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

       
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default BookShopCatalog;
