import _ from "lodash";

export const countKeywords = (keywords) => {
  const sorted = _.orderBy(
    keywords,
    (key) => {
      return key.movies.length;
    },
    ["desc"]
  );

  return sorted;
};
