export const getGenre = (genres, genre_ids) => {
  //genre in array like [12, 23, 34]
  if (genre_ids.some((obj) => Object.keys(obj).includes("id"))) {
    const currGenres = genre_ids.map((g) => {
      return g.name;
    });
    console.log(currGenres.slice(0, 2));
    return currGenres.slice(0, 2);
  } else {
    const currGenres = genre_ids.map((genreId) => {
      //get updated genres list from the server, and return genre name that matches genre id
      const match = genres.find((item) => item.id === genreId);
      return match.name;
    });
    return currGenres.slice(0, 2);
  }
};
