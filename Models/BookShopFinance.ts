



import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';
import BookShop from './BookShop';

interface BookShopFinanceAttributes {
    id: number
    bookshop_id: number
    bank_name: string
    bank_account: string
    sadapay?: string
   
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface BookShopFinanceInput extends Optional<BookShopFinanceAttributes, 'id'> { }

export interface BookShopFinanceOuput extends Required<BookShopFinanceAttributes> { }

class BookShopFinance extends Model<BookShopFinanceAttributes, BookShopFinanceInput> implements BookShopFinanceAttributes {

    public id!: number
    public bookshop_id: number
    public bank_name: string
    public bank_account: string
    public sadapay?: string;
  

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

BookShopFinance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        bookshop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: BookShop, 
                key: 'id'
            }
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank_account: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        sadapay: {
            type: DataTypes.STRING,
            allowNull: true
        }
       
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default BookShopFinance;
