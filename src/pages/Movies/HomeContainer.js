import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import HomePresenter from "./HomePresenter";

const HomeContainer = () => {
  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    upcoming: [],
    topRated: [],
    nowPlayingError: null,
    popularError: null,
    upcomingError: null,
    topRatedError: null,
    loading: true,
  });

  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    const [topRated, topRatedError] = await movieApi.topRated();
    setMovies({
      loading: false,
      nowPlaying,
      popular,
      upcoming,
      topRated,
      nowPlayingError,
      popularError,
      upcomingError,
      topRatedError,
    });
    console.log(nowPlaying.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return <HomePresenter {...movies} />;
};

export default HomeContainer;
