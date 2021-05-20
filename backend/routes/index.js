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

  router.put("/upsert", (req, res) => {
    if (!req.body.Player_ID) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing Player_ID.");
    } else {
      Player
        .updateOne({ Player_ID: req.body.Player_ID }, { ...req.body }, { upsert: true })
        .then((result) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.put("/upsertRating", (req, res) => {
    if (!req.body.Player_ID) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing Player_ID.");
    } else {
      Player
        .updateOne(
          { Player_ID: req.body.Player_ID },
          { $pull: { Ratings: { Year: req.body.Year, Player_ID: req.body.Player_ID, Scouting: req.body.Scouting } } },
          { upsert: true })
        .then((result) => {
          Player
            .updateOne(
              { Player_ID: req.body.Player_ID },
              { $push: { Ratings: { ...req.body } } },
              { upsert: true })
            .then((result) => {
              serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
            })
            .catch((e) => {
              serverResponses.sendError(res, messages.BAD_REQUEST, e);
            });
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  app.use("/api/player", router);
};
module.exports = routes;
