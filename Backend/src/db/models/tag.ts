import { Sequelize, Model, Optional, DataTypes } from "sequelize";

interface TagAttributes {
  id: number;
  name: string;
}

export interface TagInput extends Optional<TagAttributes, "id"> {}

export interface TagOuput extends Required<TagAttributes> {}

export class TagClass
  extends Model<TagAttributes, TagInput>
  implements TagOuput
{
  public id!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  TagClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Tags",
    }
  );

  return TagClass;
};
