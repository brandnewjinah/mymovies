import _ from "lodash";

export const countGenres = (liked) => {
  const arr = [
    { id: 18, name: "Drama" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
  ];
  const counts = {};
  arr.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  let count = {};

  //for movies that have genre_ids as key
  liked.map((movie) => {
    movie.genre_ids &&
      movie.genre_ids.forEach((item) => {
        count[item] = (count[item] || 0) + 1;
      });
    return count;
  });

  //for movies that have genres as key
  liked.map((movie) => {
    movie.genres &&
      movie.genres.forEach((item) => {
        count[item.id] = (count[item.id] || 0) + 1;
      });
    return count;
  });

  let result = Object.keys(count).map((e) => {
    return { key: e, count: count[e] };
  });

  const sorted = _.orderBy(result, "count", "desc");
  return sorted;
};
