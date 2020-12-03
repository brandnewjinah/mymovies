import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    discovered: [],
    discoveredError: null,
    loading: true,
  });

  const [genId, setGenId] = useState("");

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();
    const [discovered, discoveredError] = await movieApi.discover(genId);

    setMovies({
      loading: false,
      genres: genres.genres,
      genresError,
      discovered,
      discoveredError,
    });
  };

  useEffect(() => {
    getData();
  }, [genId]);

  const recommend = (gn) => {
    setGenId(gn.toString());
  };

  return <ProfilePresenter topGenres={(gn) => recommend(gn)} {...movies} />;
};

export default ProfileContainer;
