import express from "express";
import Record from "../database/models/record.js";

const router = express.Router();

router.get("/esp32/:value", async (request, response) => {

  const record = await Record.create({ value: request.params.value });

  response.status(200).send("OK");
});

export default router;
