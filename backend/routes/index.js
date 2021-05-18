const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Draft } = require("../models/players/draft");

const routes = (app) => {
  const router = express.Router();

  router.get("/draft", (req, res) => {
    Draft.find({})
      .then((draftProfiles) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, draftProfiles)
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.post("/draft", (req, res) => {
    const draft = new Draft({
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

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
