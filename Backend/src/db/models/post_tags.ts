import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { PostClass } from "./post";
import { TagClass } from "./tag";

interface PostTagsAttributes {
  id: number;
  post_id: number;
  tag_id: number;
}

export interface PostTagsInput extends Optional<PostTagsAttributes, "id"> {}

export interface PostTagsOuput extends Required<PostTagsAttributes> {}

export class PostTagsClass
  extends Model<PostTagsAttributes, PostTagsInput>
  implements PostTagsOuput
{
  public id!: number;
  public post_id!: number;
  public tag_id!: number;
}

export default (
  sequelize: Sequelize,
  post: typeof PostClass,
  tag: typeof TagClass
) => {
  PostTagsClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: post,
          key: "id",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: tag,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Post_Tags",
    }
  );

  return PostTagsClass;
};
