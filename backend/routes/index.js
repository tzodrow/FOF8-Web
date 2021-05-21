const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Player } = require("../models/players/player");
const { League } = require("../models/league/league");
const { FileHistory } = require("../models/fileHistory/fileHistory.js");

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
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, leagues);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.post("/league", (req, res) => {
    console.log(req.body);

    const league = new League({ 
      Name: req.body.Name,
      CreateDate: req.body.CreateDate,
      Active: req.body.Active
    });
    console.log(league);

    league
      .save()
      .then((league) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, league);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/fileHistory", (req, res) => {
    FileHistory.find({})
      .then((fhs) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, fhs);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.put("/fileHistory", (req, res) => {
    if (!req.body.Name) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing Name.");
    } else {
      FileHistory
        .updateOne({ Name: req.body.Name, LeagueId: req.body.LeagueId }, { ...req.body }, { upsert: true })
        .then((result) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.put("/fileHistory/complete", (req, res) => {
    if (!req.body.Name) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing Name.");
    } else {
      FileHistory
        .updateOne({ Name: req.body.Name, LeagueId: req.body.LeagueId }, { $set: { Completed: true }  })
        .then((result) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  app.use("/api", router);
};
module.exports = routes;
