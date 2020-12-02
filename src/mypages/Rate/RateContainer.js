import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RatePresenter from "./RatePresenter";

const RateContainer = () => {
  const [movies, setMovies] = useState({
    popular: [],
    popularError: null,
    topRated: [],
    topRatedError: null,
  });

  const [page, setPage] = useState(1);

  const getData = async () => {
    const [popular, popularError] = await movieApi.popular();
    const [topRated, topRatedError] = await movieApi.topRated(page);
    setMovies({
      popular,
      popularError,
      topRated,
      topRatedError,
    });
  };

  useEffect(() => {
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

  return <RatePresenter nextPage={nextPage} prevPage={prevPage} {...movies} />;
};

export default RateContainer;
