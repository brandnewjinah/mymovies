import _ from "lodash";

export const countGenres2 = (liked) => {
  let count = {};

  //count genre id occurrence
  liked.map((m) => {
    m.genre_ids &&
      m.genre_ids.forEach((item) => {
        count[item] = (count[item] || 0) + 1;
      });
    return count;
  });

  liked.map((m) => {
    m.genres &&
      m.genres.forEach((item) => {
        count[item.id] = (count[item.id] || 0) + 1;
      });
    return count;
  });

  //convert into object and sort by highest
  let result = Object.keys(count).map((e) => {
    return { key: e, count: count[e] };
  });

  const sorted = _.orderBy(result, "count", "desc");

  // //get top 3
  // const names = sorted.slice(0, 3).map((item) => {
  //   return parseInt(item["key"]);
  // });

  return sorted;
};
