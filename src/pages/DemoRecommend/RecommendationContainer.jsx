import React, { useEffect, useState } from "react";
import Recommendation from "./Recommendation";

//utils
import { countGenres2 } from "../../util/countGenres2";
import { generateRandom } from "../../util/generateRandom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  basedOnLikedMovie,
  basedOnLikedGenre,
  basedOnLikedKeyword2,
  basedOnLikedKeyword,
  basedOnLikedMovie2,
} from "../../redux/recommendRedux";
import { getGenres } from "../../redux/genreRedux";

//data
import { myKeywords } from "../../data/demo/keywords";
import { liked, disliked } from "../../data/demo/rate";

const RecommendationContainer = () => {
  const [recommend, setRecommend] = useState({});
  const [keyword, setKeyword] = useState({ first: "", second: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const { genres } = useSelector((state) => state.genres);

  useEffect(() => {
    //1. based on random liked movie
    const randomMovie = generateRandom(liked.length, 2);
    let firstLikedMovie = liked[randomMovie[0]];
    let secondLikedMovie = liked[randomMovie[1]];
    dispatch(basedOnLikedMovie(firstLikedMovie.id));
    dispatch(basedOnLikedMovie2(secondLikedMovie.id));

    //2. based on favorite genre
    let topGenres = countGenres2(liked);
    //if topGenres.length > 4, get three. if less, get length
    topGenres = topGenres.length > 4 ? topGenres.slice(0, 4) : topGenres;
    const randomGenre = generateRandom(topGenres.length, 2);
    let firstGenre = topGenres[randomGenre[0]].key;

    //2. get name for favorite genre
    let favoriteGenre = genres.find((item) => item.id === parseInt(firstGenre));
    favoriteGenre = favoriteGenre.name;
    dispatch(basedOnLikedGenre(firstGenre));

    setRecommend({
      ...recommend,
      likedMovie1: firstLikedMovie.title,
      likedMovie2: secondLikedMovie.title,
      favoriteGenre,
    });
  }, [dispatch, liked]);

  useEffect(() => {
    // 3. based on favorite keyword
    if (myKeywords.length > 0) {
      const randomKeyword = generateRandom(myKeywords.length, 2);
      let firstKeyword = myKeywords[randomKeyword[0]];
      let secondKeyword = myKeywords[randomKeyword[1]];
      setKeyword({ first: firstKeyword.name, second: secondKeyword.name });
      dispatch(basedOnLikedKeyword(firstKeyword.id));
      dispatch(basedOnLikedKeyword2(secondKeyword.id));
    }
  }, [dispatch, myKeywords]);

  let {
    basedOnLiked,
    basedOnLiked2,
    basedOnGenre,
    basedOnKeyword,
    basedOnKeyword2,
  } = useSelector((state) => state.recommend);

  //don't include the ones you rated already

  basedOnGenre = basedOnGenre.filter(
    (movie) =>
      !liked.find((item) => item.id === movie.id) &&
      !disliked.find((item) => item.id === movie.id)
  );

  basedOnKeyword = basedOnKeyword.filter(
    (movie) =>
      !liked.find((item) => item.id === movie.id) &&
      !disliked.find((item) => item.id === movie.id)
  );

  basedOnKeyword2 = basedOnKeyword2.filter(
    (movie) =>
      !liked.find((item) => item.id === movie.id) &&
      !disliked.find((item) => item.id === movie.id)
  );

  return (
    <Recommendation
      recommend={recommend}
      keyword={keyword}
      basedOnLiked={basedOnLiked}
      basedOnLiked2={basedOnLiked2}
      basedOnGenre={basedOnGenre}
      basedOnKeyword={basedOnKeyword}
      basedOnKeyword2={basedOnKeyword2}
    />
  );
};

export default RecommendationContainer;
