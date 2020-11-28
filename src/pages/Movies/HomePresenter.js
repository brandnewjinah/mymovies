import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section";
import Indicator from "../../components/Indicator";

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
  return loading ? (
    <Indicator />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing">
          {nowPlaying.map((movie) => (
            <span>{movie.title}</span>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular">
          {popular.map((movie) => (
            <span>{movie.title}</span>
          ))}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming">
          {upcoming.map((movie) => (
            <span>{movie.title}</span>
          ))}
        </Section>
      )}
    </Container>
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
  padding: 0px 10px;
`;

export default HomePresenter;
