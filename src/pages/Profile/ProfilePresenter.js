import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import _ from "lodash";

//import components
import Indicator from "../../components/Indicator";
import { Section2 } from "../../components/Section2";
import PosterList from "../../components/PosterList";
import Analyser from "./ProfileAnalyser";

//redux
import { connect } from "react-redux";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

const ProfilePresenter = (props) => {
  const [movies, setMovies] = useState([...props.liked, ...props.disliked]);
  const [topGenres, setTopGenres] = useState([]);
  const [language, setLanguage] = useState([]);
  const [crew, setCrew] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const liked = props.liked.length;
  const disliked = props.disliked.length;
  const total = liked + disliked;

  //get top genres from liked movies
  const countGenre = () => {
    let count = {};
    props.liked.map((movie) => {
      movie.genre_ids &&
        movie.genre_ids.forEach((item) => {
          count[item] = (count[item] || 0) + 1;
        });
      return count;
    });
    props.liked.map((movie) => {
      movie.genres &&
        movie.genres.forEach((item) => {
          count[item.id] = (count[item.id] || 0) + 1;
        });
      return count;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });

    const sorted = _.orderBy(result, "count", "desc");
    setTopGenres(sorted);
  };

  //get genres for each movie
  const handleGenre = (genre) => {
    //genre in array like [12, 23, 34]
    if (genre.some((obj) => Object.keys(obj).includes("id"))) {
      const genres = genre.map((g) => {
        return g.name;
      });
      return genres.slice(0, 2);
    } else if (genre) {
      const genres = genre.map((g) => {
        //get updated genres list from the server, and return genre name that matches genre id
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  //to load corresponding movies on underline click
  const filterMovies = (arr) => {
    setMovies(arr);
  };

  //to load movies under each genre
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

  const countLan = () => {
    let count = {};
    props.liked.forEach((el) => {
      count[el.original_language] = (count[el.original_language] || 0) + 1;
    });
    let result = Object.keys(count).map((e) => {
      return { key: e, count: count[e] };
    });
    const sorted = _.orderBy(result, "count", "desc");
    setLanguage(sorted);
  };

  const filterLanguage = (code) => {
    const result = props.liked.filter(
      (m) => m.original_language && m.original_language === code
    );
    setMovies(result);
  };

  const countCrew = () => {
    let list = [];

    props.liked.forEach((item) => {
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

  const countKeywords = () => {
    const sorted = _.orderBy(
      props.keywords,
      (key) => {
        return key.movies.length;
      },
      ["desc"]
    );
    setKeywords(sorted);
  };

  useEffect(() => {
    countLan();
    countGenre();
    countCrew();
    countKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {props.loading ? (
        <Indicator />
      ) : (
        <>
          <Header>
            <h2>My Movie Profile</h2>
          </Header>
          <Analyser
            total={total}
            liked={liked}
            disliked={disliked}
            filterAllMovies={() =>
              filterMovies([...props.liked, ...props.disliked])
            }
            filterLikedMovies={() => filterMovies(props.liked)}
            filterDislikedMovies={() => filterMovies(props.disliked)}
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
            keywords={keywords}
          />
          <MovieList>
            {movies && movies.length > 0 && (
              <Section2>
                {movies.map((movie) => (
                  <PosterList
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={handleGenre(movie.genre_ids || movie.genres)}
                    toDetail={true}
                  />
                ))}
              </Section2>
            )}
          </MovieList>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 1em 0;
  margin: 5em auto;
  color: ${primary.blue};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em 0;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const MovieList = styled.div`
  margin: 6em auto;
  width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    rate: state.rate,
    liked: state.rate.liked,
    disliked: state.rate.disliked,
    keywords: state.keywords.myKeywords,
  };
};

export default connect(mapStateToProps, null)(ProfilePresenter);
