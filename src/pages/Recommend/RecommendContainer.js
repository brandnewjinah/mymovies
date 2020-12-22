import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RecommendPresenter from "./RecommendPresenter";

//redux
import { connect } from "react-redux";

const RecommendContainer = (props) => {
  const [movies, setMovies] = useState({
    loading: true,
    genres: [],
    genresError: null,
    filteredGenres: [],
    filteredKeywords: [],
    discoveredGenres: [],
    discoveredGenresError: null,
    discoveredKeyword: [],
    discoveredKeywordError: null,
    Recommended: [],
    RecommendedError: [],
  });

  const [genId, setGenId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [lanId, setLanId] = useState("");
  const [likedId, setLikedId] = useState();

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();

      const [discoveredGenres, discoveredGenresError] = await movieApi.discover(
        genId,
        null,
        null
      );
      const [
        discoveredKeywords,
        discoveredKeywordsError,
      ] = await movieApi.discover(null, keyword, null);
      const [Recommended, RecommendedError] = await movieApi.recommend(likedId);

      const filteredGenres = discoveredGenres.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      const filteredKeywords = discoveredKeywords.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        discoveredGenres,
        discoveredGenresError,
        discoveredKeywords,
        discoveredKeywordsError,
        filteredGenres,
        filteredKeywords,
        Recommended,
        RecommendedError,
      });
    };
    getData();
  }, [genId, lanId, likedId]);

  return (
    <RecommendPresenter
      findGenres={(gn) => setGenId(gn)}
      findKeywords={(key) => setKeyword(key)}
      topLan={(lan) => setLanId(lan)}
      findSimilar={(id) => setLikedId(id)}
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
