import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';


interface BookAttributes {
    id: number
    title: string
    author: string
    iban: string
    published_date: Date
    genres: [string]
    publisher: string


    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface BookInput extends Optional<BookAttributes, 'id'> { }

export interface BookOuput extends Required<BookAttributes> { }

class Book extends Model<BookAttributes, BookInput> implements BookAttributes {

    public id!: number
    public title: string
    public author: string
    public iban: string
    public published_date: Date
    public genres: [string]
    public publisher: string

    

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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iban: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published_date: {
            type: DataTypes.DATE
        },
        genres: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        publisher: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize: sequelizeConnection,
        paranoid: true,
    },
)


export default Book;
