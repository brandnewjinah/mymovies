import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RecommendPresenter from "./RecommendPresenter";

//redux
import { connect } from "react-redux";

const RecommendContainer = (props) => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    similar: [],
    similarError: null,
    discovered: [],
    discoveredError: null,
    foreign: [],
    foreignError: null,
    unRated: [],
    loading: true,
  });

  const [genId, setGenId] = useState("");
  const [lanId, setLanId] = useState("");
  const [likedId, setLikedId] = useState();

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [discovered, discoveredError] = await movieApi.discover(genId);
      const [foreign, foreignError] = await movieApi.foreign(lanId);
      const [similar, similarError] = await movieApi.similar(likedId);

      const filtered = discovered.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      const filteredLn = foreign.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        similar,
        similarError,
        discovered,
        discoveredError,
        foreign: filteredLn,
        foreignError,
        unRated: filtered,
      });
    };
    getData();
  }, [genId, lanId, likedId]);

  return (
    <RecommendPresenter
      findGenres={(gn) => setGenId(gn)}
      topLan={(lan) => setLanId(lan)}
      findSimilar={(id) => setLikedId(id)}
      {...movies}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, null)(RecommendContainer);
