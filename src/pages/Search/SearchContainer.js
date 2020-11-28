import React, { useState } from "react";
import { movieApi, tvApi } from "../../api";

import SearchPresenter from "./SearchPresenter";

const SearchContainer = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    movies: [],
    shows: [],
    movieError: null,
    showsError: null,
  });

  const onChange = (event) => setKeyword(event.target.value);

  const search = async (e) => {
    e.preventDefault();

    if (keyword === "") {
      return;
    }

    setLoading(true);

    const [movies, movieError] = await movieApi.search(keyword);
    const [shows, showsError] = await tvApi.search(keyword);

    setResults({
      movies,
      shows,
      movieError,
      showsError,
    });
    setLoading(false);
    console.log(movies);
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
