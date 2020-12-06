import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Indicator from "../../components/Indicator";
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles
import styled from "styled-components";

const CategoryPresenter = (props) => {
  const currentGenre = parseInt(props.genre);

  const handleGenre = () => {
    if (currentGenre) {
      const found = props.genres.find((item) => item.id === currentGenre);
      return found.name;
    }
  };

  return props.loading ? (
    <>
      <Indicator />
      <Helmet>
        <title>Loading | Movie Rate</title>
      </Helmet>
    </>
  ) : (
    <Container>
      <Helmet>
        {/* <title>
          {props.result.title ? props.result.title : props.result.original_name}
          | Movie Rate
        </title> */}
      </Helmet>
      <Header>
        <h2>{handleGenre()}</h2>
      </Header>
      {props.result && props.result.length > 0 && (
        <Section>
          {props.result.map((movie) => (
            <PosterList
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              // genre={handleGenre(movie.genre_ids)}
              toDetail={true}
            />
          ))}
        </Section>
      )}
    </Container>
  );
};

CategoryPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  resultError: PropTypes.string,
  similar: PropTypes.array,
  similarError: PropTypes.string,
};

const Container = styled.div`
  margin: 6em auto;
  width: 100%;
  max-width: 1260px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }
`;
const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  CategoryPresenter
);
