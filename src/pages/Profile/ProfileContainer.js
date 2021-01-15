import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [movies, setMovies] = useState({
    loading: true,
    genres: [],
    genresError: null,
  });

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
      });
      window.scrollTo(0, 0);
    };

    getData();
  }, []);

  return <ProfilePresenter {...movies} />;
};

export default ProfileContainer;
