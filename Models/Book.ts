import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelizeConnection from "../config/config";

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  iban: string;
  published_date: Date;
  genre: string[];
  publisher: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface BookInput extends Optional<BookAttributes, "id"> {}

export interface BookOuput extends Required<BookAttributes> {}

class Book extends Model<BookAttributes, BookInput> implements BookAttributes {
  public id!: number;
  public title: string;
  public author: string;
  public iban: string;
  public published_date: Date;
  public publisher: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
  // Convert genre string to array when accessed
  public get genre():any {
    const rawValue:any = this.getDataValue("genre");
    return rawValue ? rawValue.split(",") : [];
  }

  // Set genre as a comma-separated string when assigned
  public set genre(value:any) {
    this.setDataValue("genre", value.join(","));
  }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue:any = this.getDataValue("genre");
        return rawValue ? rawValue.split(",") : [];
      },
      set(value:any) {
        this.setDataValue("genre", value.join(","));
      },
    },
    publisher: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Book;
