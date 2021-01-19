import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RatePresenter from "./RatePresenter";

const RateContainer = () => {
  const [movies, setMovies] = useState({
    loading: true,
    genres: [],
    genresError: null,
    topRated: [],
    topRatedError: null,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [topRated, topRatedError] = await movieApi.topRated(page);

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        topRated,
        topRatedError,
      });
      window.scrollTo(0, 0);
    };
    getData();
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <RatePresenter
      nextPage={nextPage}
      prevPage={prevPage}
      page={page}
      {...movies}
    />
  );
};

export default RateContainer;
