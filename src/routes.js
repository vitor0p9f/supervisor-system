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
  const startOfTheWeek = moment
    .tz(request.params.date, "America/Sao_Paulo")
    .startOf("week");
  const endOfTheWeek = moment
    .tz(request.params.date, "America/Sao_Paulo")
    .endOf("week");

  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const currentDate = startOfTheWeek;
  let weeklyValues = [];
  let dayCounter = 0;

  while (currentDate.isSameOrBefore(endOfTheWeek)) {
    const dailyValues = await Record.findAll({
      attributes: [
        [fn("MIN", col("value")), "min"],
        [fn("MAX", col("value")), "max"],
      ],
      where: {
        createdAt: {
          [Op.between]: [
            moment.tz(currentDate, timeZone).startOf("day"),
            moment.tz(currentDate, timeZone).endOf("day"),
          ],
        },
      },
    });

    weeklyValues.push({
      day: weekDays[dayCounter],
      max: dailyValues[0].dataValues.max,
      min: dailyValues[0].dataValues.min,
    });

    currentDate.add(1, "days");

    dayCounter++;
  }

  response.status(200).json(weeklyValues);
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
