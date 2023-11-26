import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';


interface BookAttributes {
    id: number
    name: string
    price: number

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface BookInput extends Optional<BookAttributes, 'id'> { }

export interface BookOuput extends Required<BookAttributes> { }

class Book extends Model<BookAttributes, BookInput> implements BookAttributes {

    public id!: number
    public name: string
    public price: number

    

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default Book;
