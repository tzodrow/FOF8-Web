const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");
const { Draft } = require("../models/players/draft");

const routes = (app) => {
  const router = express.Router();

  router.post("/todos", (req, res) => {
    const todo = new Todo({
      text: req.body.text,
      newField: true
    });

    todo
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

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
    const draftProfiles = req.body.map(dp => {
      const draftProfile = new Draft({
        ...dp
      });
      return draftProfile.save();
    });
    Promise.all(draftProfiles)
      .then((res) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, res.length);
      })
      .catch((e) => {
        serverResponses.sendError(res, e);
      });
  });

  //it's a prefix before api it is useful when you have many modules and you want to
  //differentiate b/w each module you can use this technique
  app.use("/api", router);
};
module.exports = routes;
