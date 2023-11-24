import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config/config';


interface MineralAttributes {
    id: number
    name: string
    price: number

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface MineralInput extends Optional<MineralAttributes, 'id'> { }

export interface MineralOuput extends Required<MineralAttributes> { }

class Mineral extends Model<MineralAttributes, MineralInput> implements MineralAttributes {

    public id!: number
    public name: string
    public price: number

    

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

Mineral.init(
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


export default Mineral;
