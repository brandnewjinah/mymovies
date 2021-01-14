import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import RecommendPresenter from "./RecommendPresenter";

//redux
import { connect } from "react-redux";

const RecommendContainer = (props) => {
  const liked = props.liked;
  const [movies, setMovies] = useState({
    likedMovie: {},
    recommended: [],
    recommendedError: null,
  });

  useEffect(() => {
    const getData = async () => {
      let random = Math.floor(Math.random() * liked.length) + 1;
      let likedMovie = liked[random];

      const [recommended, recommendedError] = await movieApi.recommend(
        likedMovie.id
      );
      // const [genres, genresError] = await movieApi.genre();

      setMovies({
        likedMovie,
        recommended,
        recommendedError,
      });
    };

    getData();
  }, []);
  return <RecommendPresenter {...movies} />;
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default connect(mapStateToProps, null)(RecommendContainer);
