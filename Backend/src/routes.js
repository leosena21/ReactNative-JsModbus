const express = require("express");
const ModController = require("./controllers/ModController");

const routes = express.Router();

routes.get("/mod", ModController.index);
routes.post("/mod/coil/:addr/value/:value", ModController.coil);
routes.post("/mod/reg/:addr/value/:value", ModController.registers);

module.exports = routes;
