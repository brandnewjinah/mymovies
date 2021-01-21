import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import _ from "lodash";

//import utils
import { CountGenres } from "../../util/LikeCounter";
import { getGenre } from "../../util/GetGenres";
import { countKeywords } from "../../util/CountKeywords";

//import components
import Placeholder from "../../components/placeholders/Profile";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";
import Analyser from "./DemoAnalyser";

//data
import { likedKeywords } from "../../data/demo/keywords";
import { dislikedMovies, likedMovies } from "../../data/demo/rate";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

const DemoPresenter = (props) => {
  const [movies, setMovies] = useState([...likedMovies, ...dislikedMovies]);
  const [topGenres, setTopGenres] = useState([]);
  const [language, setLanguage] = useState([]);
  const [crew, setCrew] = useState([]);
  const liked = likedMovies.length;
  const disliked = dislikedMovies.length;
  const total = liked + disliked;

  //get top genres from liked movies
  const countGenre = () => {
    //get liked genres
    const sorted = CountGenres(likedMovies);

    setTopGenres(sorted);
  };

  //to load corresponding movies on underline click
  const filterMovies = (arr) => {
    setMovies(arr);
  };

  //to load movies under each genre
  const filterGenre = (id) => {
    const result = likedMovies.filter(
      (m) => m.genre_ids && m.genre_ids.includes(id)
    );

    const result2 = likedMovies.filter(
      (m) => m.genres && m.genres.find((g) => g.id === id)
    );

    const combined = [...result, ...result2];
    setMovies(combined);
  };

  const countLan = () => {
    let count = {};
    likedMovies.forEach((el) => {
      count[el.original_language] = (count[el.original_language] || 0) + 1;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setLanguage(sorted);
  };

  const filterLanguage = (code) => {
    const result = likedMovies.filter(
      (m) => m.original_language && m.original_language === code
    );
    setMovies(result);
  };

  const countCrew = () => {
    let list = [];

    likedMovies.forEach((item) => {
      let newItem = {
        id: item.director.id,
        name: item.director.name,
        count: 1,
      };

      //see if director exists in count
      let exists = list.find((item) => item.id === newItem.id);
      if (exists) {
        let newExists = { ...exists, count: exists.count + 1 };
        let index = list.findIndex((item) => item.id === exists.id);
        list[index] = newExists;
      } else {
        list = [...list, newItem];
      }
    });

    const sorted = _.orderBy(
      list,
      (key) => {
        return key.count;
      },
      ["desc"]
    );
    setCrew(sorted);
  };

  useEffect(() => {
    countLan();
    countGenre();
    countCrew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {props.loading ? (
        <>
          <Placeholder />
          <Helmet>
            <title>Loading | My Movies</title>
          </Helmet>
        </>
      ) : (
        <>
          <Helmet>
            <title>Demo | My Movies</title>
          </Helmet>
          <Header>
            <h4>Demo Profile</h4>
            <div className="sub">
              <span>To see your own profile, </span>
              <Link to="/rate">
                <span className="link">rate at least 10 movies</span>
              </Link>
            </div>
          </Header>
          <Analyser
            total={total}
            liked={liked}
            disliked={disliked}
            filterAllMovies={() =>
              filterMovies([...likedMovies, ...dislikedMovies])
            }
            filterLikedMovies={() => filterMovies(likedMovies)}
            filterDislikedMovies={() => filterMovies(dislikedMovies)}
            topGenres={topGenres}
            availGenres={props.genres}
            filterGenre1={(id) => filterGenre(id)}
            filterGenre2={(id) => filterGenre(id)}
            filterGenre3={(id) => filterGenre(id)}
            language={language}
            filterLanguage1={(code) => filterLanguage(code)}
            filterLanguage2={(code) => filterLanguage(code)}
            filterLanguage3={(code) => filterLanguage(code)}
            crew={crew}
            keywords={countKeywords(likedKeywords)}
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
                  genre={getGenre(
                    props.genres,
                    movie.genre_ids || movie.genres
                  )}
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

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;
  color: ${primary.blue};

  @media (max-width: 1200px) {
    padding: 0 2em;
  }

  @media (max-width: 425px) {
    padding: 0 1em;
  }
`;

const Header = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 0 2em;

  h4 {
    text-align: center;
    margin-bottom: 0.5em;
  }

  .sub {
    line-height: 1.25rem;
  }

  .link {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 1.8rem;
    }
  }
`;

export default DemoPresenter;
