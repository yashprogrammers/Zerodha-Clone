const { model } = require("mongoose");

const { WatchListSchema } = require("../Schema/WatchListSchema");

const WatchListModel = new model("watchlist", WatchListSchema);

module.exports = { WatchListModel };