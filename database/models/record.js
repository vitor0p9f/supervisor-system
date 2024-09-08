import { DataTypes } from "sequelize";
import database from "../connection.js";

const Record = database.define("Record", {
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Record;
