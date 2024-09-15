import express from "express";
import Record from "../database/models/record.js";
import { Op } from "sequelize";
import moment from "moment-timezone";

const router = express.Router();

router.get("/esp32/:value", async (request, response) => {
  const record = await Record.create({ value: request.params.value });

  response.status(200).send(record);
});

router.get("/frontend/daily/:date", async (request, response) => {
  const records = await Record.findAll({
    where: {
      createdAt: {
        [Op.between]: [
          moment.tz(request.params.date, "America/Sao_Paulo").startOf("day"),
          moment.tz(request.params.date, "America/Sao_Paulo").endOf("day"),
        ],
      },
    },
  });

  response.status(200).json(records);
});

export default router;
