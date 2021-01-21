import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import components
import Placeholder from "../../components/placeholders/List";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";
import { Pagination } from "../../components/Pagination";

//import utils
import { getGenre } from "../../util/GetGenres";

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

  return (
    <Container>
      {props.loading ? (
        <>
          <Placeholder />
          <Helmet>
            <title>Loading | Movie Rate</title>
          </Helmet>
        </>
      ) : (
        <>
          <Helmet>
            <title>
              {props.keyword
                ? props.keyword.name
                : props.director
                ? props.director.name
                : handleGenre()}{" "}
              | My Movies
            </title>
          </Helmet>
          <Header>
            <h4>{props.genre && handleGenre()}</h4>
            <h5>
              {props.keyword && (
                <>
                  <span>Movies with keyword </span>
                  <span className="underline">{props.keyword.name}</span>
                </>
              )}
            </h5>
            <h5>
              {props.director && (
                <>
                  <span>Movies by </span>
                  <span className="underline">{props.director.name}</span>
                </>
              )}
            </h5>
          </Header>
          {props.result && props.result.length > 0 && (
            <Grid2>
              {props.result.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={getGenre(props.genres, movie.genre_ids)}
                  toDetail={true}
                />
              ))}
            </Grid2>
          )}
          <Pagination
            page={props.page}
            handlePrev={props.prevPage}
            handleNext={props.nextPage}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;

  @media (max-width: 1200px) {
    padding: 0 2em;
  }

  @media (max-width: 768px) {
    margin: 5em auto;
  }

  @media (max-width: 425px) {
    padding: 0 1em;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;
  color: ${primary.blue};
  padding: 3em 0 2em;

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

  @media (max-width: 768px) {
    padding: 1em 0;

    h4 {
      font-size: 1.75rem;
    }
  }
`;

CategoryPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.array,
  resultError: PropTypes.string,
  similar: PropTypes.array,
  similarError: PropTypes.string,
};

export default CategoryPresenter;
