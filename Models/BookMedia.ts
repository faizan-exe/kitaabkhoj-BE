



import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';
import BookShopCatalog from './BookShopCatalog';

interface BookMediaAttributes {
    id: number
    bookshopcatalog_id: number
    img_url: string

}

export interface BookMediaInput extends Optional<BookMediaAttributes, 'id'> { }

export interface BookMediaOuput extends Required<BookMediaAttributes> { }

class BookMedia extends Model<BookMediaAttributes, BookMediaInput> implements BookMediaAttributes {

    public id!: number
    public bookshopcatalog_id: number
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
        bookshopcatalog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BookShopCatalog, 
                key: 'id'
        }
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default BookMedia;
