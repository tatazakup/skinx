import { QueryInterface, Sequelize, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    queryInterface.createTable("Tags", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    return queryInterface.dropTable("Tags");
  },
};
