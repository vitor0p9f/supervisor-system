import express from "express";
import Record from "../database/models/record.js";
import { Op, fn, literal, col } from "sequelize";
import moment from "moment-timezone";

const router = express.Router();

const timeZone = "America/Sao_Paulo";

router.get("/esp32/:value", async (request, response) => {
  const record = await Record.create({ value: request.params.value });

  response.status(200).send(record);
});

router.get("/frontend/daily/:date", async (request, response) => {
  const records = await Record.findAll({
    attributes: ["value", "createdAt"],
    order: [[fn("EXTRACT", literal('HOUR FROM "createdAt"')), "ASC"]],
    where: {
      createdAt: {
        [Op.between]: [
          moment.tz(request.params.date, timeZone).startOf("day"),
          moment.tz(request.params.date, timeZone).endOf("day"),
        ],
      },
    },
  });

  response.status(200).json(
    records.map((record) => ({
      value: record.dataValues.value,
      hour: parseInt(
        moment.tz(record.dataValues.createdAt, timeZone).format("HH"),
      ),
    })),
  );
});

router.get("/frontend/weekly/:date", async (request, response) => {
  const records = await Record.findAll({
    where: {
      createdAt: {
        [Op.between]: [
          moment
            .tz(request.params.date, "America/Sao_Paulo")
            .startOf("week")
            .subtract(1, "days"), // Start of the week on Sunday
          moment
            .tz(request.params.date, "America/Sao_Paulo")
            .endOf("week")
            .add(6, "days"), // End of the week on Saturday
        ],
      },
    },
  });

  response.status(200).json(records);
});

router.get("/frontend/monthly/:date", async (request, response) => {
  const records = await Record.findAll({
    where: {
      createdAt: {
        [Op.between]: [
          moment.tz(request.params.date, "America/Sao_Paulo").startOf("month"),
          moment.tz(request.params.date, "America/Sao_Paulo").endOf("month"),
        ],
      },
    },
  });

  response.status(200).json(records);
});

router.get("/frontend/annual/:date", async (request, response) => {
  const records = await Record.findAll({
    where: {
      createdAt: {
        [Op.between]: [
          moment.tz(request.params.date, "America/Sao_Paulo").startOf("year"),
          moment.tz(request.params.date, "America/Sao_Paulo").endOf("year"),
        ],
      },
    },
  });

  response.status(200).json(records);
});

export default router;
