const express = require("express");
const { handleConfirmEmail, getStatusConfirm } = require("../controllers");
const { send } = require("../service/mail.services");
const path = require("path");

const rootRouter = express.Router();

rootRouter.post("/send-email", async (req, res) => {
  const { receiveEmail, subject, text = "", html = "" } = req.body;
  if (receiveEmail && subject) {
    try {
      await send(receiveEmail, subject, text, html);
      res.status(200).json({
        message: "sent!",
      });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: `Internal Server Error ${error}`,
      });
    }
  } else {
    res.status(400).json({
      error: 1,
      message: "Bad Request",
    });
  }
});

rootRouter.get("/confirm-email", async (req, res) => {
  const { code, d } = req.query;
  const now = Date.now();
  if (now - d >= 60000) {
    await handleConfirmEmail(code);
    res.sendFile(__dirname + "/expires-time.html");
  } else {
    await handleConfirmEmail(code);
    res.sendFile(__dirname + "/confirm-success.html");
  }
});

rootRouter.get("/check-status-confirm", async (req, res) => {
  const { code } = req.query;
  const isHasCode = await getStatusConfirm(code);
  res.status(200).json({
    confirm: isHasCode ? true : false,
  });
});

module.exports = rootRouter;
