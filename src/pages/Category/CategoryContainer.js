import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import { useParams } from "react-router-dom";

import CategoryPresenter from "./CategoryPresenter";

const CategoryContainer = ({ pathname }) => {
  let { id } = useParams();

  const [detail, setDetail] = useState({
    loading: true,
    result: [],
    genre: id,
    genres: [],
    genresError: null,
    resultError: null,
  });

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();
    const [result, resultError] = await movieApi.discover(id);

    setDetail({
      result,
      resultError,
      genres: genres.genres,
      genresError,
      genre: id,
      loading: false,
    });
  };

  useEffect(() => {
    getData();
  }, [id]);

  return <CategoryPresenter {...detail} />;
};

export default CategoryContainer;
