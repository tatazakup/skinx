import { QueryInterface, Sequelize } from "sequelize";
import db from "../models";
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const User = await db.user.create({
      username: "admin",
      password: hashedPassword,
    });

    User.save();
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    await queryInterface.bulkDelete("Users", {});
  },
};
