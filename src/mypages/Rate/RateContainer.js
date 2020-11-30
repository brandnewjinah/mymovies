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

  const getData = async () => {
    const [popular, popularError] = await movieApi.popular();
    const [topRated, topRatedError] = await movieApi.topRated();
    setMovies({
      popular,
      popularError,
      topRated,
      topRatedError,
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return <RatePresenter {...movies} />;
};

export default RateContainer;
