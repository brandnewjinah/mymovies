import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import { useParams, useLocation } from "react-router-dom";

import CategoryPresenter from "./CategoryPresenter";

const CategoryContainer = ({ pathname }) => {
  let { id } = useParams();
  let location = useLocation();

  const [detail, setDetail] = useState({
    loading: true,
    result: [],
    genre: id,
    genres: [],
    keyword: {},
    keywordError: null,
    director: {},
    directorError: null,
    genresError: null,
    resultError: null,
  });

  const [page, setPage] = useState(1);

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();

    if (location.pathname.includes("/keyword/")) {
      const [result, resultError] = await movieApi.discoverKeyword(id, page);
      const [keyword, keywordError] = await movieApi.keywordlist(id);

      setDetail({
        loading: false,
        genres: genres.genres,
        genresError,
        result,
        resultError,
        keyword,
        keywordError,
      });
    }

    if (location.pathname.includes("/category/")) {
      const [result, resultError] = await movieApi.discover(id, null, null);

      setDetail({
        loading: false,
        result,
        resultError,
        genres: genres.genres,
        genresError,
        genre: id,
      });
    }

    if (location.pathname.includes("/director/")) {
      const [result, resultError] = await movieApi.discoverCrew(id);
      const [director, directorError] = await movieApi.person(id);

      setDetail({
        loading: false,
        genres: genres.genres,
        genresError,
        director,
        directorError,
        result,
        resultError,
      });
    }

    // const [genres, genresError] = await movieApi.genre();
    // const [keyword, keywordError] = await movieApi.keywordlist(id);

    // const [result, resultError] = location.pathname.includes("/keyword/")
    //   ? await movieApi.discoverKeyword(id)
    //   : await movieApi.discover(id);

    // setDetail({
    //   result,
    //   resultError,
    //   keyword,
    //   keywordError,
    //   genres: genres.genres,
    //   genresError,
    //   genre: id,
    //   loading: false,
    // });
  };

  useEffect(() => {
    getData();
  }, [id, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  console.log(detail);
  return <CategoryPresenter nextPage={nextPage} page={page} {...detail} />;
};

export default CategoryContainer;
