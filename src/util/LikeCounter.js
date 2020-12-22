import _ from "lodash";

export const CountGenres = (liked) => {
  let count = {};

  liked.map((movie) => {
    movie.genre_ids &&
      movie.genre_ids.forEach((item) => {
        count[item] = (count[item] || 0) + 1;
      });
    return count;
  });
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
