import { QueryTypes } from "sequelize";
import db from "../db/models";

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (
  data: {
    rows: {
      id: string;
      title: string;
      content: string;
      postedAt: string;
      postedBy: string;
      tags: string[];
      total_count: number;
    }[];
    count: number;
  },
  page: number,
  limit: number
) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  const items = rows.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    postedAt: item.postedAt,
    postedBy: item.postedBy,
    tags: item.tags,
  }));

  return { totalItems, items, totalPages, currentPage };
};

export type GetPostsProps = {
  page?: string;
  size?: string;
  sort?: "ASC" | "DESC";
  search?: string;
  searchBy?: "title" | "tag";
};

export const GetPosts = async (
  props: GetPostsProps
): Promise<[number, {} | null]> => {
  const { page, size, sort = "ASC", search = "", searchBy = "title" } = props;

  const { limit, offset } = getPagination(Number(page), Number(size));

  let condition: string = "";
  let having: string = "";
  let order: string = "";

  if (searchBy === "title" && search !== "") {
    condition = `WHERE Posts.title LIKE '%${search}%'`;
  } else if (searchBy === "tag" && search !== "") {
    const tagsArray = search?.split(",");
    const tagsStr = tagsArray.map((tag) => `'${tag}'`).join(", ");
    condition = `WHERE Tags.name IN (${tagsStr})`;

    having = `HAVING COUNT(DISTINCT Tags.name) >= ${tagsArray.length}`;
  }

  if (sort === "ASC") {
    order = `ORDER BY Posts.title ASC`;
  } else if (sort === "DESC") {
    order = `ORDER BY Posts.title DESC`;
  }

  const posts: {
    id: string;
    title: string;
    content: string;
    postedAt: string;
    postedBy: string;
    tags: string[];
    total_count: number;
  }[] = await db.sequelize.query(
    `
      SELECT
      Posts.id,
      Posts.title,
      Posts.content,
      Posts.postedAt,
      Posts.postedBy,
      JSON_ARRAYAGG(Tags.name) as "tags",
      COUNT(*) OVER () as "total_count"
  FROM
      Posts
  LEFT JOIN
      Post_Tags ON Posts.id = Post_Tags.post_id
  LEFT JOIN
      Tags ON Post_Tags.tag_id = Tags.id
  ${condition}
  GROUP BY
      Posts.id
  ${having}
  ${order}
  LIMIT ${limit}
  OFFSET ${offset}
  `,
    { type: QueryTypes.SELECT }
  );

  const result = getPagingData(
    { count: posts.length > 0 ? posts[0].total_count : 0, rows: posts },
    Number(page),
    limit
  );

  return [0, result];
};
