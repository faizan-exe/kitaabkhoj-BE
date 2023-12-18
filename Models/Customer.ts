import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from './../config/config';

interface CustomerAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
    delivery_address: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> { }

export interface CustomerOuput extends Required<CustomerAttributes> { }

class Customer extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {

    public id!: number;
    public name: string;
    public phone: string
    public email: string;
    public delivery_address: string;
  

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Customer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement :true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    phone:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    delivery_address:{
        type: DataTypes.STRING,
        allowNull: false
    }

   
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
})


export default Customer    