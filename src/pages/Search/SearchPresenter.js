import React from "react";
// import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import utils
import { getGenre } from "../../util/GetGenres";

//import components
import Indicator from "../../components/Indicator";
import { Grid2 } from "../../components/Grid";

import Poster from "../../components/Poster";

//import styles and assets
import styled from "styled-components";

const SearchPresenter = (props) => {
  return (
    <>
      <Helmet>
        <title>Search | Movie Rate</title>
      </Helmet>
      <Container>
        <Form onSubmit={props.onSubmit}>
          <Input
            placeholder="Search Movies"
            value={props.keyword}
            onChange={props.onChange}
          />
        </Form>
        {props.loading ? (
          <Indicator />
        ) : (
          <>
            {props.movies && props.movies.length > 0 && (
              <Grid2 title="Movie Results">
                {props.movies.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    genre={getGenre(props.genres, movie.genre_ids)}
                    isMovie={true}
                  />
                ))}
              </Grid2>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto 0;

  @media (max-width: 1200px) {
    padding: 0 2em;
  }

  @media (max-width: 425px) {
    padding: 0 1em;
  }
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

export default SearchPresenter;
