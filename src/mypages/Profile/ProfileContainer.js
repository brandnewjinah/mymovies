import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    loading: true,
  });

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();

    setMovies({
      loading: false,
      genres: genres.genres,
      genresError,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <ProfilePresenter {...movies} />;
};

export default ProfileContainer;
