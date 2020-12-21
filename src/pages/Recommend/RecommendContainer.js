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
    similar2: [],
    similarError2: null,
    discovered: [],
    discoveredError: null,
    discoveredKeyword: [],
    discoveredKeywordError: null,
    foreign: [],
    foreignError: null,
    unRated: [],
    loading: true,
  });

  const [genId, setGenId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [lanId, setLanId] = useState("");
  const [likedId, setLikedId] = useState();
  const [likedId2, setLikedId2] = useState();

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [discovered, discoveredError] = await movieApi.discover(
        genId,
        null
      );
      const [
        discoveredKeyword,
        discoveredKeywordError,
      ] = await movieApi.discover(null, keyword);
      const [foreign, foreignError] = await movieApi.foreign(lanId);
      const [similar, similarError] = await movieApi.similar(likedId);
      const [similar2, similarError2] = await movieApi.similar(likedId2);

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
        similar,
        similarError,
        similar2,
        similarError2,
        genres: genres.genres,
        genresError,
        discovered,
        discoveredError,
        discoveredKeyword,
        discoveredKeywordError,
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
      findKeywords={(key) => setKeyword(key)}
      topLan={(lan) => setLanId(lan)}
      findSimilar1={(id) => setLikedId(id)}
      findSimilar2={(id) => setLikedId2(id)}
      {...movies}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default connect(mapStateToProps, null)(RecommendContainer);
