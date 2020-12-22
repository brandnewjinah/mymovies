export const getGenre = (genres, genre) => {
  //genre in array like [12, 23, 34]
  if (genre.some((obj) => Object.keys(obj).includes("id"))) {
    const currGenres = genre.map((g) => {
      return g.name;
    });
    return currGenres.slice(0, 2);
  } else if (genre) {
    const currGenres = genre.map((g) => {
      //get updated genres list from the server, and return genre name that matches genre id
      const found = genres.find((item) => item.id === g);
      return found.name;
    });
    return currGenres.slice(0, 2);
  }
};
