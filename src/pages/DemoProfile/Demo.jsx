import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//components
import Placeholder from "../../components/placeholder/Profile";
import { Header } from "../../components/Header";
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

import { liked, disliked } from "../../data/demo/rate";
import { myKeywords } from "../../data/demo/keywords";

const DemoProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const { genres, loading } = useSelector((state) => state.genres);
  const [movies, setMovies] = useState([...liked, ...disliked]);
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
    <>
      {loading ? (
        <Placeholder />
      ) : (
        <>
          <Header
            title="Demo Profile"
            subtitle={
              <>
                To see your own profile,
                <Link to="/movies/rate">
                  <span className="link">rate at least 10 movies</span>
                </Link>
              </>
            }
          />

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
    </>
  );
};

export default DemoProfile;
