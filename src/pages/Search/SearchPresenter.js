import React from "react";
// import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import components
import Indicator from "../../components/Indicator";
import Section from "../../components/Section";
import Poster from "../../components/Poster";

//import styles and assets
import styled from "styled-components";

const SearchPresenter = ({
  movies,
  shows,
  keyword,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <>
      <Helmet>
        <title>Search | Movie Rate</title>
      </Helmet>
      <Container>
        <Form onSubmit={onSubmit}>
          <Input
            placeholder="Search Movies or TV shows"
            value={keyword}
            onChange={onChange}
          />
        </Form>
        {loading ? (
          <Indicator />
        ) : (
          <>
            {movies && movies.length > 0 && (
              <Section title="Movie Results">
                {movies.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {shows && shows.length > 0 && (
              <Section title="Shows Results">
                {shows.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.name}
                    rating={show.vote_average}
                    year={show.first_air_date}
                  />
                ))}
              </Section>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 6em 20px;
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
