import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

//import components
import Placeholder from "../../components/placeholders/List";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";

//import utils
import { getGenre } from "../../util/GetGenres";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles
import styled from "styled-components";
import { primary } from "../../components/Colors";

const CollectionPresenter = (props) => {
  const movies = props.result;

  let unique =
    props.collection_id < 100
      ? movies
      : movies.winners &&
        movies.winners.filter(
          (elem, index, self) =>
            self.findIndex((t) => {
              return t.id === elem.id;
            }) === index
        );

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
            <title>Collection | My Movies</title>
          </Helmet>
          <Header>
            <h5>
              <span>Movies that won </span>
              <span className="underline">
                {props.collection_id < 100
                  ? props.result[0].award
                  : `${props.result.year} ${props.result.name}`}
              </span>
            </h5>
          </Header>
          {unique && unique.length > 0 && (
            <Grid2>
              {unique.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  year={movie.release_date}
                  genre={getGenre(props.genres, movie.genre_ids)}
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

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;

  @media (max-width: 1200px) {
    padding: 0 2em;
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
  text-align: center;
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
  }
`;

CollectionPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  result: PropTypes.array,
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
  CollectionPresenter
);
