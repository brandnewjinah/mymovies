import React, { useState, useEffect } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    genres: [],
    genresError: null,
    movies: [],
    movieError: null,
    loading: true,
  });

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();
    const [movies, movieError] = await movieApi.search(keyword);

    setResults({
      loading: false,
      movies,
      movieError,
      genres: genres.genres,
      genresError,
    });
    setLoading(false);
    console.log(movies);
  };

  useEffect(() => {
    getData();
  }, []);

  return <ProfilePresenter {...results} keyword={keyword} />;
};

export default ProfileContainer;
