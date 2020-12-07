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
    genresError: null,
    resultError: null,
  });

  const getData = async () => {
    if (location.pathname.includes("/keyword/")) {
      const [result, resultError] = await movieApi.discoverKeyword(id);
      const [keyword, keywordError] = await movieApi.keywordlist(id);

      setDetail({
        result,
        resultError,
        keyword,
        keywordError,
        loading: false,
      });
    }

    if (location.pathname.includes("/category/")) {
      const [result, resultError] = await movieApi.discover(id);
      const [genres, genresError] = await movieApi.genre();

      setDetail({
        result,
        resultError,
        genres: genres.genres,
        genresError,
        genre: id,
        loading: false,
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
  }, [id]);

  return <CategoryPresenter {...detail} />;
};

export default CategoryContainer;
