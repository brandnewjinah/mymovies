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
    collection_id: 0,
    genres: [],
    genresError: null,
    resultError: null,
  });

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();

      // if id is collection id
      // if id is award id
      const idNum = parseInt(id);

      if (idNum < 100) {
        setDetail({
          genres: genres.genres,
          genresError,
          collection_id: idNum,
          result: Oscars.map((m) =>
            m.winners.find((f) => f.award_id === idNum)
          ),
          loading: false,
        });

        window.scrollTo(0, 0);
      } else {
        setDetail({
          genres: genres.genres,
          genresError,
          collection_id: idNum,
          result: Oscars.find((f) => f.id === idNum),
          loading: false,
        });

        window.scrollTo(0, 0);
      }
    };

    getData();
  }, [id]);

  return <CollectionPresenter {...detail} />;
};

export default CollectionContainer;
