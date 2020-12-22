import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RatePresenter from "./RatePresenter";

const RateContainer = () => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    topRated: [],
    topRatedError: null,
    loading: true,
    credits: {},
    creditsError: null,
  });

  const [page, setPage] = useState(1);
  const [credit, setCredit] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [topRated, topRatedError] = await movieApi.topRated(page);
      // const [credits, creditsError] = await movieApi.credits(credit);

      // const filtered =
      //   credits &&
      //   credits.crew &&
      //   credits.crew.find((c) => c.job === "Director");

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        topRated,
        topRatedError,
        // credits: filtered,
        // creditsError,
      });
      // window.scrollTo(0, 0);
    };
    getData();
  }, [page, credit]);

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
      addDirector={(id) => setCredit(id)}
      page={page}
      {...movies}
    />
  );
};

export default RateContainer;
