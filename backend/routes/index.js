const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Player } = require("../models/players/player");
const { League } = require("../models/league/league");

const routes = (app) => {
  const router = express.Router();

  router.get("/player", (req, res) => {
    Player.findOne({})
      .then((draftProfiles) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, draftProfiles)
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.put("/player/upsert", (req, res) => {
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

  router.put("/player/upsertRating", (req, res) => {
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

  router.get("/league", (req, res) => {
    League.find({})
      .then((leagues) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, leagues)
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.post("/league", (req, res) => {
    const league = new League({
        ...req.body
    });

    league.save()
        .then((leagues) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, leagues)
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  app.use("/api", router);
};
module.exports = routes;
