import React, { useState, useEffect } from "react";
import Search from "./Search";
import { movieApi } from "../../api";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../../redux/movieRedux";
import { getGenres } from "../../redux/genreRedux";

const SearchContainer = () => {
  const dispatch = useDispatch();
  const [results, setResults] = useState({});
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const onChange = (event) => setKeyword(event.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (keyword === "") {
      return;
    }

    dispatch(getGenres());
    const response = await movieApi.search(keyword, page);
    setResults({
      results: response.results,
      total_pages: response.total_pages,
    });
  };

  const { genres } = useSelector((state) => state.genres);

  const handlePage = async (page) => {
    setPage(page);
    const response = await movieApi.search(keyword, page);
    setResults({
      results: response.results,
      total_pages: response.total_pages,
    });
  };

  return (
    <Search
      onChange={onChange}
      onSubmit={onSubmit}
      keyword={keyword}
      genres={genres}
      page={page}
      total_pages={results.total_pages}
      results={results.results}
      handlePage={(page) => handlePage(page)}
    />
  );
};

export default SearchContainer;
