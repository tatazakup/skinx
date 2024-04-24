import { QueryInterface, Sequelize, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    queryInterface.createTable("Post_Tags", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Posts",
          },
          key: "id",
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Tags",
          },
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable("Post_Tags");
  },
};
