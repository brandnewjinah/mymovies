import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  id: String,
  title: String,
  release_date: String,
  genre_ids: [String],
  poster_path: String,
});

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cover: [String],
    movies: [movieSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
