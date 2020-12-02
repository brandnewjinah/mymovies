import React, { useState, useEffect } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

const ProfileContainer = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    movies: [],
    movieError: null,
  });

  const getData = async () => {
    const [movies, movieError] = await movieApi.search(keyword);

    setResults({
      movies,

      movieError,
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
