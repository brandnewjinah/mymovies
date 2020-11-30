import React from "react";
import PropTypes from "prop-types";

//import components
import Section from "../../components/Section";
import Indicator from "../../components/Indicator";
import PosterList from "../../components/PosterList";

//import styles and assets
import styled from "styled-components";

const RatePresenter = ({ popular, error, topRated }) => {
  return (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Now Playing">
          {topRated.map((movie) => (
            <PosterList
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

RatePresenter.propTypes = {
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

export default RatePresenter;
