import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import components
import Section from "../../components/Section";
import Indicator from "../../components/Indicator";
import Poster from "../../components/Poster";

//import styles and assets
import styled from "styled-components";

const HomePresenter = ({
  nowPlaying,
  popular,
  upcoming,
  topRated,
  loading,
  error,
}) => {
  return (
    <>
      <Helmet>
        <title>Movie | Movie Rate</title>
      </Helmet>
      {loading ? (
        <Indicator />
      ) : (
        <Container>
          {nowPlaying && nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {nowPlaying.map((movie) => (
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
          {popular && popular.length > 0 && (
            <Section title="Popular">
              {popular.map((movie) => (
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
          {upcoming && upcoming.length > 0 && (
            <Section title="Upcoming">
              {upcoming.map((movie) => (
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
        </Container>
      )}
      ;
    </>
  );
};

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const Container = styled.div`
  padding: 6em 10px;
`;

export default HomePresenter;
