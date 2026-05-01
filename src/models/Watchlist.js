const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: String, required: true },
    title: String,
    posterPath: String,
    type: { type: String, enum: ["movie", "tv"], default: "movie" },
  },
  { timestamps: true },
);


WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Watchlist", WatchlistSchema);
