import React, { useEffect, useState } from "react";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/Recommend";
import Recommend from "../../components/Recommend";
import { breakpoint, primaryColors } from "../../components/token";

//utils
import { countGenres2 } from "../../util/countGenres2";
import { countKeywords } from "../../util/countKeywords";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  basedOnLikedKeywordAndGenre,
  basedOnLikedGenre,
  basedOnLikedKeyword,
  basedOnLikedKeyword2,
  basedOnLikedMovie,
} from "../../redux/recommendRedux";
import { getGenres } from "../../redux/genreRedux";

const Recommendation = () => {
  const dispatch = useDispatch();
  const [recommend, setRecommend] = useState({});
  const [keyword, setKeyword] = useState({ first: "", second: "" });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const { liked, disliked } = useSelector((state) => state.rate);
  const { genres } = useSelector((state) => state.genres);
  const { myKeywords } = useSelector((state) => state.keyword);

  let topKeyword = countKeywords(myKeywords);

  //get two random uniqe numbers
  const randomUniqueNumbers = (range, count) => {
    let genreNums = new Set();
    while (genreNums.size < count) {
      genreNums.add(Math.floor(Math.random() * range));
    }
    return [...genreNums];
  };

  useEffect(() => {
    //1. based on random liked movie
    let random = Math.floor(Math.random() * liked.length);
    let likedMovie = liked[random];
    dispatch(basedOnLikedMovie(likedMovie.id));

    //2. based on favorite genre
    let topGenres = countGenres2(liked);
    const randomGenre = randomUniqueNumbers(topGenres.length, 2);
    let firstGenre = topGenres[randomGenre[0]].key;
    let secondGenre = topGenres[randomGenre[1]].key;

    //2. get name for favorite genre
    let favoriteGenre = genres.find((item) => item.id === parseInt(firstGenre));
    favoriteGenre = favoriteGenre.name;
    dispatch(basedOnLikedGenre(firstGenre));

    //3. based on favorite keyword
    if (myKeywords.length > 0) {
      const randomKeyword = randomUniqueNumbers(topKeyword.length, 2);
      let firstKeyword = topKeyword[randomKeyword[0]];
      let secondKeyword = topKeyword[randomKeyword[1]];
      setKeyword({ first: firstKeyword.name, second: secondKeyword.name });
      dispatch(basedOnLikedKeyword(firstKeyword.id));
      dispatch(basedOnLikedKeyword2(secondKeyword.id));
    }

    //4. based on keyword and genre
    // if (myKeywords.length > 0) {
    //   const randomKeyword = Math.floor(Math.random() * topKeyword.length);
    //   const selectedKeyword = topKeyword[randomKeyword];
    //   const keyword = selectedKeyword.id;
    //   const randomGenre = Math.floor(Math.random() * topGenres.length);
    //   const selectedGenre = topGenres[randomGenre];
    //   const genre = selectedGenre.key;
    //   dispatch(
    //     basedOnLikedKeywordAndGenre({
    //       genre: genre,
    //       keyword: keyword,
    //     })
    //   );
    // }

    setRecommend({
      ...recommend,
      likedMovie: likedMovie.title,
      favoriteGenre,
    });
  }, [dispatch, liked]);

  let {
    basedOnLiked,
    basedOnGenre,
    basedOnKeyword,
    basedOnKeyword2,
    basedOnKeywordAndGenre,
    loading,
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

  // basedOnKeywordAndGenre = basedOnKeywordAndGenre.filter(
  //   (movie) =>
  //     !liked.find((item) => item.id === movie.id) &&
  //     !disliked.find((item) => item.id === movie.id)
  // );

  return (
    <Container>
      {loading ? (
        <Placeholder />
      ) : (
        <>
          <Header>
            <h5>Recommended for you</h5>
          </Header>

          <Section>
            {basedOnLiked && basedOnLiked.length > 0 && (
              <Recommend
                data={basedOnLiked && basedOnLiked}
                title={`Because you liked ${recommend.likedMovie}`}
              />
            )}
          </Section>
          <Section>
            {basedOnKeyword && basedOnKeyword.length > 0 && (
              <Recommend
                data={basedOnKeyword && basedOnKeyword}
                title={`Because you liked keyword: ${keyword.first}`}
              />
            )}
          </Section>
          <Section>
            {basedOnKeyword2 && basedOnKeyword2.length > 0 && (
              <Recommend
                data={basedOnKeyword2 && basedOnKeyword2}
                title={`Because you liked keyword: ${keyword.second}`}
              />
            )}
          </Section>
          <Section>
            {basedOnGenre && basedOnGenre.length > 0 && (
              <Recommend
                data={basedOnGenre && basedOnGenre}
                title={`Because you like ${recommend.favoriteGenre}`}
                genres={genres}
              />
            )}
          </Section>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto 0;

  @media ${breakpoint.m} {
    padding: 0 2em 1em;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${primaryColors.blue};
  padding: 0.5em 0;

  h5 {
    text-align: center;
  }

  @media ${breakpoint.m} {
  }
`;

const Section = styled.div`
  margin: 3em 0 4em;

  @media ${breakpoint.m} {
    margin: 3em 0;
  }
`;

export default Recommendation;
