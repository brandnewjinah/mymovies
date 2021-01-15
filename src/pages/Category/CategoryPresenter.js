import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Indicator from "../../components/Indicator";
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";

//import utils
import { getGenre } from "../../util/GetGenres";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles
import styled from "styled-components";
import { primary } from "../../components/Colors";

const CategoryPresenter = (props) => {
  const handleGenre = () => {
    const currentGenre = parseInt(props.genre);
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
        <h3>{props.genre && handleGenre()}</h3>
        <h3>
          {props.keyword && (
            <>
              <span>Movies with keyword </span>
              <span className="underline">{props.keyword.name}</span>
            </>
          )}
        </h3>
        <h3>
          {props.director && (
            <>
              <span>Movies directed by </span>
              <span className="underline">{props.director.name}</span>
            </>
          )}
        </h3>
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
              genre={getGenre(props.genres, movie.genre_ids)}
              // genre={handleGenre(movie.genre_ids)}
              toDetail={true}
            />
          ))}
        </Section>
      )}
      <Footer>
        {props.page !== 1 ? (
          <Button onClick={props.prevPage}>Prev</Button>
        ) : null}
        <Button onClick={props.nextPage}>Next</Button>
      </Footer>
    </Container>
    // <Container>container</Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  padding: 2em 0;
  margin: 5em auto;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;
  padding: 0 2em 1.25em;
  color: ${primary.blue};

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .underline {
    position: relative;
    white-space: nowrap;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: transparent;
  font-family: "Poppins", sans-serif;
  color: #172d6e;
  font-size: 1.125rem;
  font-weight: 400;
  border-bottom: 3px solid #172d6e;
  margin: 0 0.5em;
  cursor: pointer;
`;

const Footer = styled(Flex)`
  justify-content: space-between;
  padding: 0 1em;

  @media (max-width: 640px) {
    flex-direction: column;

    p {
      font-size: 0.875rem;
      line-height: 3rem;
    }
  }
`;

CategoryPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.object,
  resultError: PropTypes.string,
  similar: PropTypes.array,
  similarError: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  CategoryPresenter
);
