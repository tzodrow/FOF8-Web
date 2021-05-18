const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Player } = require("../models/players/player");

const routes = (app) => {
  const router = express.Router();

  router.get("", (req, res) => {
    Player.find({})
      .then((draftProfiles) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, draftProfiles)
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.post("/draft", (req, res) => {
    const draft = new Player({
      ...req.body
    });

    draft
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.post("/draftmany", (req, res) => {
    Player
      .insertMany(req.body)
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.put("/upsert", (req, res) => {
    if (!req.body.Player_ID) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing Player_ID.");
    } else {
      Player
      .update({ Player_ID: req.body.Player_ID }, { ...req.body }, { upsert: true })
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
    }
  })

  app.use("/api/player", router);
};
module.exports = routes;
