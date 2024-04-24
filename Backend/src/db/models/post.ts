import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  postedAt: Date;
  postedBy: string;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}

export interface PostOuput extends Required<PostAttributes> {}

export class PostClass
  extends Model<PostAttributes, PostInput>
  implements PostOuput
{
  public id!: number;
  public title!: string;
  public content!: string;
  public postedAt!: Date;
  public postedBy!: string;
}

export default (sequelize: Sequelize) => {
  PostClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      postedAt: DataTypes.DATE,
      postedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );

  return PostClass;
};
