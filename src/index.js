import express from "express";
import routes from "./routes.js";

const server = express();
const port = process.env.PORT || 4000;

server.use(routes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
