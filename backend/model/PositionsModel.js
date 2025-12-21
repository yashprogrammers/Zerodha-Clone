const { model } = require("mongoose");

const { PositionsSchema } = require("../schema/PositionsSchema");

const PositionModel = new model("position", PositionsSchema);

module.exports = { PositionModel };