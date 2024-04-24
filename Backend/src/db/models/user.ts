import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  refresh?: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

export interface UserOuput extends Required<UserAttributes> {}

export class UserClass
  extends Model<UserAttributes, UserInput>
  implements UserOuput
{
  public id!: number;
  public refresh!: string;
  public username!: string;
  public password!: string;
}

export default (sequelize: Sequelize) => {
  UserClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      refresh: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Users",
    }
  );

  return UserClass;
};
