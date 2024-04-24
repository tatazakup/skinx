import { QueryInterface, Sequelize } from "sequelize";
import db from "../models";
import JsonFile from "../database/posts.json";

type Post = {
  title: string;
  content: string;
  postedAt: string;
  postedBy: string;
  tags: string[];
};

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const jsonData = JsonFile as Post[];
    const uniqueTags = [...new Set(jsonData.flatMap((post) => post.tags))];
    const tagIdsMap: { [key: string]: number } = {};

    for (const tag of uniqueTags) {
      const Tag = await db.tag.create({
        name: tag,
      });

      tagIdsMap[tag] = Tag.id;

      await Tag.save();
    }

    for (const post of jsonData) {
      const { title, content, postedAt, postedBy, tags } = post;

      const dateObject = new Date(postedAt);

      const Post = await db.post.create({
        title: title,
        content: content,
        postedBy: postedBy,
        postedAt: dateObject,
      });

      await Post.save();

      const tagIds = tags.map((tag) => tagIdsMap[tag]);

      if (tagIds.length !== 0) {
        const mapPostTags = tagIds.map((id) => ({
          post_id: Post.id,
          tag_id: id,
        }));

        await db["post-tags"].bulkCreate(mapPostTags);
      }
    }
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkDelete("Posts", {});
    await queryInterface.bulkDelete("Tags", {});
    await queryInterface.bulkDelete("Post_Tags", {});
  },
};
