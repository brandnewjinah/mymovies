import _ from "lodash";

export const countCrew = (liked) => {
  let list = [];

  liked.forEach((item) => {
    let newItem = {
      id: item.director.id,
      name: item.director.name,
      count: 1,
    };

    //see if director exists in count
    let exists = list.find((item) => item.id === newItem.id);
    if (exists) {
      let newExists = { ...exists, count: exists.count + 1 };
      let index = list.findIndex((item) => item.id === exists.id);
      list[index] = newExists;
    } else {
      list = [...list, newItem];
    }
  });

  const sorted = _.orderBy(
    list,
    (key) => {
      return key.count;
    },
    ["desc"]
  );
  return sorted;
};
