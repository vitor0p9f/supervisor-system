import express from "express";
import routes from "./routes.js";
import database from "../database/connection.js";

const server = express();
const port = process.env.PORT || 4000;

try {
  await database.authenticate();

  await database.sync();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

server.use(routes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
