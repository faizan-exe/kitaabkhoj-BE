



import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';
import BookShop from './BookShop';
import Book from './Book';

interface BookMediaAttributes {
    id: number
    book_id: number
    bookshop_id: number
    img_url: string

}

export interface BookMediaInput extends Optional<BookMediaAttributes, 'id'> { }

export interface BookMediaOuput extends Required<BookMediaAttributes> { }

class BookMedia extends Model<BookMediaAttributes, BookMediaInput> implements BookMediaAttributes {

    public id!: number
    public book_id: number
    public bookshop_id: number
    public img_url: string
  

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

BookMedia.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Book, 
                key: 'id'
        }
        },
        bookshop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BookShop, 
                key: 'id'
        }
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
       
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default BookMedia;
