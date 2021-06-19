const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Player } = require("../models/players/player");
const { League } = require("../models/league/league");
const { FileHistory } = require("../models/fileHistory/fileHistory.js");

const playerResultLimit = 15;

const routes = (app) => {
  const router = express.Router();

  router.get("/draft/years", (req, res) => {
    if (!req.query.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId.");
    } else {
      Player
        .find({ LeagueId: req.query.LeagueId, Season_1_Year: { $gte: 0 } }, { _id: 0, Season_1_Year: 1 })
        .distinct("Season_1_Year")
        .then((dys) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, dys);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.get("/draft/players/:draftYear", (req, res) => {
    if (!req.query.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId.");
    } else {
      const skip = req.query.Skip && !isNaN(req.query.Skip) ? parseInt(req.query.Skip) : 0;
      let sort;
      switch(req.query.PositionGroup) {
        case "C":
          sort = { Overall_Projection_C: -1 };
          break;
        case "CB":
          sort = { Overall_Projection_CB: -1 };
          break;
        case "DE":
          sort = { Overall_Projection_DE: -1 };
          break;
        case "DT":
          sort = { Overall_Projection_DT: -1 };
          break;
        case "FB":
          sort = { Overall_Projection_FB: -1 };
          break;
        case "G":
          sort = { Overall_Projection_G: -1 };
          break;
        case "ILB":
          sort = { Overall_Projection_ILB: -1 };
          break;
        case "K":
          sort = { Overall_Projection_K: -1 };
          break;
        case "OLB":
          sort = { Overall_Projection_OLB: -1 };
          break;
        case "P":
          sort = { Overall_Projection_P: -1 };
          break;
        case "QB":
          sort = { Overall_Projection_QB: -1 };
          break;
        case "RB":
          sort = { Overall_Projection_RB: -1 };
          break;
        case "S":
          sort = { Overall_Projection_S: -1 };
          break;
        case "T":
          sort = { Overall_Projection_T: -1 };
          break;
        case "TE":
          sort = { Overall_Projection_TE: -1 };
          break;
        case "WR":
          sort = { Overall_Projection_WR: -1 };
          break;
        default:
          sort = { Player_ID: -1 }
      }
      Player
        .find(
          {
            LeagueId: req.query.LeagueId,
            Season_1_Year: req.params.draftYear,
            Position_Group: req.query.PositionGroup
          },
          undefined,
          {
            limit: playerResultLimit,
            skip: skip * playerResultLimit,
            sort: sort
          })
        .then((fhs) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, fhs);
        })
        .catch((e) => {
          console.log(e);
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.get("/player", (req, res) => {
    if (!req.query.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId.");
    } else {
      const skip = req.query.Skip && !isNaN(req.query.Skip) ? parseInt(req.query.Skip) : 0;
      Player.find({ LeagueId: req.query.LeagueId }, undefined, { limit: playerResultLimit, skip: skip * playerResultLimit, sort: { Player_ID: 1 } })
        .then((fhs) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, fhs);
        })
        .catch((e) => {
          console.log(e);
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.put("/player/upsert", (req, res) => {
    if (!req.body.Player_ID || !req.body.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId or Player_ID.");
    } else {
      Player
        .updateOne({ Player_ID: req.body.Player_ID, LeagueId: req.body.LeagueId }, { ...req.body }, { upsert: true })
        .then((result) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.put("/player/upsertRating", (req, res) => {
    if (!req.body.Player_ID || !req.body.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId or Player_ID.");
    } else {
      Player
        .updateOne(
          { Player_ID: req.body.Player_ID, LeagueId: req.body.LeagueId },
          { $pull: { Ratings: { Year: req.body.Year, Player_ID: req.body.Player_ID, LeagueId: req.body.LeagueId, Scouting: req.body.Scouting } } },
          { upsert: true })
        .then((result) => {
          Player
            .updateOne(
              { Player_ID: req.body.Player_ID, LeagueId: req.body.LeagueId },
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
    const league = new League({
      Name: req.body.Name,
      CreateDate: req.body.CreateDate,
      Active: req.body.Active
    });

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
    if (!req.query.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId.");
    } else {
      FileHistory.find({ LeagueId: req.query.LeagueId })
        .then((fhs) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, fhs);
        })
        .catch((e) => {
          serverResponses.sendError(res, messages.BAD_REQUEST, e);
        });
    }
  });

  router.put("/fileHistory", (req, res) => {
    if (!req.body.Name || !req.body.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId or Name.");
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
    if (!req.body.Name || !req.body.LeagueId) {
      serverResponses.sendError(res, messages.BAD_REQUEST, "Missing LeagueId or Name.");
    } else {
      FileHistory
        .updateOne({ Name: req.body.Name, LeagueId: req.body.LeagueId }, { $set: { Completed: true } })
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
