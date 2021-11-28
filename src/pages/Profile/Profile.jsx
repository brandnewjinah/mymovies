import React, { useState, useEffect } from "react";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/Profile";
import { HeaderH4 } from "../../components/Header";
import Analyser from "./Analyser";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";

//util
import { getGenre } from "../../util/getGenres";
import { countGenres } from "../../util/countGenres";
import { countLanguage } from "../../util/countLanguage";
import { countKeywords } from "../../util/countKeywords";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../../redux/genreRedux";
import { countCrew } from "../../util/countCrew";
import { breakpoint } from "../../components/token";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const { genres, loading } = useSelector((state) => state.genres);
  const { liked, disliked } = useSelector((state) => state.rate);
  const [movies, setMovies] = useState([...liked, ...disliked]);
  const { myKeywords } = useSelector((state) => state.keyword);
  const total = liked.length + disliked.length;

  const filterMovies = (arr) => {
    setMovies(arr);
  };

  const filterGenre = (id) => {
    const result = liked.filter((m) => m.genre_ids && m.genre_ids.includes(id));

    const result2 = liked.filter(
      (m) => m.genres && m.genres.find((g) => g.id === id)
    );

    const combined = [...result, ...result2];
    setMovies(combined);
  };

  const filterLanguage = (code) => {
    const result = liked.filter(
      (m) => m.original_language && m.original_language === code
    );
    setMovies(result);
  };

  return (
    <Container>
      {loading ? (
        <Placeholder />
      ) : (
        <>
          <HeaderH4 title="My Movie Profile" />
          <Analyser
            total={total}
            liked={liked.length}
            disliked={disliked.length}
            filterAllMovies={() => filterMovies([...liked, ...disliked])}
            filterLikedMovies={() => filterMovies(liked)}
            filterDislikedMovies={() => filterMovies(disliked)}
            topGenres={countGenres(liked).slice(0, 3)}
            availGenres={genres}
            filterGenre={(id) => filterGenre(id)}
            language={countLanguage(liked).slice(0, 3)}
            filterLanguage={(code) => filterLanguage(code)}
            crews={countCrew(liked).slice(0, 3)}
            keywords={countKeywords(myKeywords)}
          />
          {movies && movies.length > 0 && (
            <Grid2>
              {movies.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={getGenre(genres, movie.genres)}
                  toDetail={true}
                />
              ))}
            </Grid2>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1140px;
  margin: 7rem auto;

  @media ${breakpoint.xlg} {
    padding: 0 2rem;
  }

  @media ${breakpoint.m} {
    padding: 0 1rem;
  }
`;

export default Profile;
