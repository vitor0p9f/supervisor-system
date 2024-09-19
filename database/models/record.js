import { DataTypes } from "sequelize";
import database from "../connection.js";

const Record = database.define(
  "Record",
  {
    value: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  },
);

export default Record;
