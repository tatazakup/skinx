import { QueryInterface, Sequelize, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    queryInterface.createTable("Posts", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      postedAt: DataTypes.DATE,
      postedBy: DataTypes.STRING,
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable("Posts");
  },
};
