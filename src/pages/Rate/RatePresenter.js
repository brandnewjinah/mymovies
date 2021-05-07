import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { movieApi } from "../../api";

//import utils
import { getGenre } from "../../util/GetGenres";

//import components
import { Grid } from "../../components/Grid";
import RatePoster from "../../components/RatePoster";
import Placeholder from "../../components/placeholders/List";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../reducers/rateReducer";

//import styles and assets
import styled, { css } from "styled-components";
import { primaryColors, breakpoint } from "../../components/Token";

const RatePresenter = (props) => {
  const [total, setTotal] = useState(0);

  const ratedTen = total > 9 ? true : false;

  const handleLike = async (movie) => {
    const credits = await movieApi.credits(movie.id);

    const director =
      credits &&
      credits[0].crew &&
      credits[0].crew.find((c) => c.job === "Director");

    const likedMovie = {
      ...movie,
      director: { id: director.id, name: director.name },
    };
    props.likeItem(likedMovie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  useEffect(() => {
    const handleRated = () => {
      const totalRated = props.liked.length + props.disliked.length;
      setTotal(totalRated);
    };

    handleRated();
  }, [props.liked, props.disliked]);

  return (
    <Container>
      {props.loading ? (
        <>
          <Placeholder />
          <Helmet>
            <title>Loading | My Movies</title>
          </Helmet>
        </>
      ) : (
        <>
          <Helmet>
            <title>Rate | My Movies</title>
          </Helmet>
          <Header>
            <h2>
              <span
                style={
                  ratedTen
                    ? { color: primaryColors.green }
                    : { color: primaryColors.warning }
                }
              >
                {total}
              </span>
              <span> / 10</span>
            </h2>
            {ratedTen ? (
              <Subheader>
                You rated 10 movies! Keep rating or
                <Link to="/profile">
                  <span className="link">See your profile</span>
                </Link>
              </Subheader>
            ) : (
              <Subheader>
                Rate at least 10 movies to get your personalized profile
              </Subheader>
            )}
          </Header>
          {props.topRated && props.topRated.length > 0 && (
            <Grid>
              {props.topRated.map((movie) => (
                <RatePoster
                  key={movie.id}
                  rate={true}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={getGenre(props.genres, movie.genre_ids)}
                  liked={
                    props.liked &&
                    props.liked.find((item) => item.id === movie.id)
                  }
                  disliked={
                    props.disliked &&
                    props.disliked.find((item) => item.id === movie.id)
                  }
                  onClick1={() => handleLike(movie)}
                  onClick2={() => handleDislike(movie)}
                />
              ))}
            </Grid>
          )}

          <Footer>
            You rated {props.liked.length + props.disliked.length} / 10
            <div
              style={{
                display: "flex",
              }}
            >
              {props.page !== 1 ? (
                <Button onClick={props.prevPage}>Prev</Button>
              ) : null}
              <Button onClick={props.nextPage}>Next</Button>
            </div>
          </Footer>
        </>
      )}
    </Container>
  );
};

const Flex = css`
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

const Header = styled.header`
  ${Flex}
  justify-content: center;
  flex-direction: column;
  color: ${primaryColors.blue};
  padding: 0 2em;
  margin-bottom: 4em;
`;

const Subheader = styled.h6`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25em;

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media (max-width: 780px) {
    line-height: 1.5rem;
    text-align: center;
    flex-direction: column;
  }

  @media ${breakpoint.m} {
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

const Footer = styled.footer`
  ${Flex}
  justify-content: space-between;
  flex-direction: column;
  padding: 1em 1em 4em;

  @media ${breakpoint.m} {
    flex-direction: row;
  }
`;

RatePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  RatePresenter
);
