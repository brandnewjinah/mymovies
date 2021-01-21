import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import { useParams, useLocation } from "react-router-dom";

import CategoryPresenter from "./CategoryPresenter";

const CategoryContainer = ({ pathname }) => {
  let { id } = useParams();
  let location = useLocation();

  const [detail, setDetail] = useState({
    loading: true,
    genre: id,
    genres: [],
    genresError: null,
    result: [],
    resultError: null,
    keyword: {},
    keywordError: null,
    director: {},
    directorError: null,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
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
        window.scrollTo(0, 0);
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
        window.scrollTo(0, 0);
      }

      if (location.pathname.includes("/director/")) {
        const [result, resultError] = await movieApi.discoverCrew(id, page);
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
        window.scrollTo(0, 0);
      }
    };

    getData();
  }, [id, location.pathname, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <CategoryPresenter
      nextPage={nextPage}
      prevPage={prevPage}
      page={page}
      {...detail}
    />
  );
};

export default CategoryContainer;
