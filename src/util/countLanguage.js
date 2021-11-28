import _ from "lodash";

export const countLanguage = (liked) => {
  let count = {};
  liked.forEach((el) => {
    count[el.original_language] = (count[el.original_language] || 0) + 1;
  });
  let result = Object.keys(count).map((e) => {
    return { key: e, count: count[e] };
  });
  const sorted = _.orderBy(result, "count", "desc");
  return sorted;
};
