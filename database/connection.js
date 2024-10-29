import { Sequelize } from "sequelize";

const db_connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    timezone: "America/Sao_Paulo",
  },
);

export default db_connection;