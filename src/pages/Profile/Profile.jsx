import React, { useState } from "react";

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
import { countCrew } from "../../util/countCrew";

const Profile = (props) => {
  const [movies, setMovies] = useState([...props.liked, ...props.disliked]);

  const filterMovies = (movies) => {
    setMovies(movies);
  };

  const filterGenre = (id) => {
    const result = props.liked.filter(
      (m) => m.genre_ids && m.genre_ids.includes(id)
    );

    const result2 = props.liked.filter(
      (m) => m.genres && m.genres.find((g) => g.id === id)
    );

    const combined = [...result, ...result2];
    setMovies(combined);
  };

  const filterLanguage = (code) => {
    const result = props.liked.filter(
      (m) => m.original_language && m.original_language === code
    );
    setMovies(result);
  };

  return (
    <>
      {props.loading ? (
        <Placeholder />
      ) : (
        <>
          <Header title="My Movie Profile" />
          <Analyser
            total={props.total}
            liked={props.liked.length}
            disliked={props.disliked.length}
            showAllMovies={() =>
              filterMovies([...props.liked, ...props.disliked])
            }
            showLikedMovies={() => filterMovies(props.liked)}
            showDislikedMovies={() => filterMovies(props.disliked)}
            topGenres={countGenres(props.liked).slice(0, 3)}
            availGenres={props.genres}
            showGenre={(id) => filterGenre(id)}
            language={countLanguage(props.liked).slice(0, 3)}
            showLanguage={(code) => filterLanguage(code)}
            crews={countCrew(props.liked).slice(0, 3)}
            keywords={countKeywords(props.myKeywords)}
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
                  genre={getGenre(props.genres, movie.genres)}
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

export default Profile;
