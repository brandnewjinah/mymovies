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
import { TextButton } from "../../components/Buttons";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../reducers/rateReducer";

//import styles and assets
import styled, { css } from "styled-components";
import {
  primaryColors,
  breakpoint,
  size,
  spacing,
} from "../../components/Token";

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
            <Pagination>
              {props.page !== 1 ? (
                <TextButton
                  label="Prev"
                  color={primaryColors.blue}
                  handleClick={props.prevPage}
                />
              ) : null}
              <TextButton
                label="Next"
                color={primaryColors.blue}
                handleClick={props.nextPage}
              />
            </Pagination>
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
  max-width: ${size.xlg};
  margin: 7em auto 0;

  @media ${breakpoint.m} {
    padding: 0 ${spacing.m};
  }
`;

const Header = styled.header`
  ${Flex}
  justify-content: center;
  flex-direction: column;
  color: ${primaryColors.blue};
  padding: 0 ${spacing.xxl};
  margin-bottom: ${spacing.xxxl};
`;

const Subheader = styled.h6`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.l};

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media ${breakpoint.m} {
    line-height: 1.5rem;
    text-align: center;
    flex-direction: column;
  }
`;

const Footer = styled.section`
  ${Flex}
  justify-content: space-between;
  flex-direction: row;
  padding: ${spacing.m} ${spacing.m} ${spacing.xxxl};

  @media ${breakpoint.m} {
    flex-direction: column;
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 1rem;
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
