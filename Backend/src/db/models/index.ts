import { Sequelize } from "sequelize";
import { ENV } from "../../configs/env.config";
import User, { UserClass } from "./user";
import Tag, { TagClass } from "./tag";
import Post, { PostClass } from "./post";
import PostTags, { PostTagsClass } from "./post_tags";

export interface Db {
  sequelize: Sequelize;
  user: typeof UserClass;
  tag: typeof TagClass;
  post: typeof PostClass;
  "post-tags": typeof PostTagsClass;
}

const sequelize = new Sequelize(
  ENV.DATABASE.DATABASE,
  ENV.DATABASE.USER,
  ENV.DATABASE.PASSWORD,
  {
    port: ENV.DATABASE.PORT,
    host: ENV.DATABASE.HOST,
    dialect: ENV.DATABASE.DIALECT,
    dialectModule: require("mysql2"),
    define: {
      timestamps: false,
    },
  }
);

const UserModel = User(sequelize);
const PostModel = Post(sequelize);
const TagModel = Tag(sequelize);
const PostTagsModel = PostTags(sequelize, PostModel, TagModel);

const db: Db = {
  sequelize: sequelize,
  user: UserModel,
  tag: TagModel,
  post: PostModel,
  "post-tags": PostTagsModel,
};

export default db;
