require("dotenv").config();

console.log(process.env);

module.exports = {
  development: {
    dialect: process.env.MYSQLDB_DIALECT,
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_PORT,
    define: {
      underscored: true,
    },
    logging: true,
  },
};
