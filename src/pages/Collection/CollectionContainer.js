import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import { useParams } from "react-router-dom";

import CollectionPresenter from "./CollectionPresenter";
import { Oscars } from "../../data/awards";

const CollectionContainer = ({ pathname }) => {
  let { id } = useParams();

  const [detail, setDetail] = useState({
    loading: true,
    result: {},
    genre: id,
    genres: [],
    genresError: null,
    resultError: null,
  });

  const getData = async () => {
    const [genres, genresError] = await movieApi.genre();

    setDetail({
      genres: genres.genres,
      genresError,
      genre: id,
      result: Oscars.find((f) => f.id === parseInt(id)),
      loading: false,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <CollectionPresenter {...detail} />;
};

export default CollectionContainer;
