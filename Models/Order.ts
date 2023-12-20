import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "./../config/config";
import BookShopCatalog from "./BookShopCatalog";
import Customer from "./Customer";
import BookShop from "./BookShop";

interface OrderAttributes {
  id: number;
  bookshopcatalog_id: number;
  bookshop_id: number;
  customer_id: number;
  delivery_duration: number;
  delivery_location: string;
  no_of_copies: number;
  delivered: boolean;
  price: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrderInput extends Optional<OrderAttributes, "id"> {}

export interface OrderOuput extends Required<OrderAttributes> {}

class Order
  extends Model<OrderAttributes, OrderInput>
  implements OrderAttributes
{
  id: number;
  bookshopcatalog_id: number;
  customer_id: number;
  bookshop_id: number;
  delivery_duration: number;
  delivery_location: string;
  no_of_copies: number;
  delivered: boolean;
  price: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookshopcatalog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BookShopCatalog,
        key: "id",
      },
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
    },
    bookshop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BookShop,
        key: "id",
      },
    },
    delivery_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    delivery_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    no_of_copies: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Order;
