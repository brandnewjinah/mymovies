import React, { useState } from "react";
import { movieApi, tvApi } from "../../api";

import SearchPresenter from "./SearchPresenter";

const SearchContainer = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    genres: [],
    movies: [],
    movieError: null,
  });

  const onChange = (event) => setKeyword(event.target.value);

  const search = async (e) => {
    e.preventDefault();

    if (keyword === "") {
      return;
    }

    setLoading(true);

    const [genres, genresError] = await movieApi.genre();
    const [movies, movieError] = await movieApi.search(keyword);

    setResults({
      genres: genres.genres,
      genresError,
      movies,
      movieError,
    });
    setLoading(false);
  };

  return (
    <SearchPresenter
      {...results}
      onChange={onChange}
      onSubmit={search}
      keyword={keyword}
    />
  );
};

export default SearchContainer;
