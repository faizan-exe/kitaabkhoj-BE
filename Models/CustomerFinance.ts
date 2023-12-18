import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from './../config/config';
import Customer from './Customer';

interface CustomerFinanceAttributes {
    id: number;
    customer_id: number;
    bank_name: string;
    bank_account: string;
    sadapay: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CustomerFinanceInput extends Optional<CustomerFinanceAttributes, 'id'> { }

export interface CustomerFinanceOuput extends Required<CustomerFinanceAttributes> { }

class CustomerFinance extends Model<CustomerFinanceAttributes, CustomerFinanceInput> implements CustomerFinanceAttributes {

    public id!: number;
    public customer_id: number;
    public bank_name: string
    public bank_account: string;
    public sadapay: string;
  

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CustomerFinance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement :true,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Customer, 
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

   
}, {
    sequelize: sequelizeConnection,
    paranoid: true,
})


export default CustomerFinance    