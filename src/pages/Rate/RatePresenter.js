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
import styled from "styled-components";
import { primary } from "../../components/Colors";

const RatePresenter = (props) => {
  const [total, setTotal] = useState(0);

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
            <h3>
              <span
                style={
                  total < 10
                    ? { color: primary.warning }
                    : { color: primary.green }
                }
              >
                {total}
              </span>
              <span> / 10</span>
            </h3>
            {total > 9 ? (
              <div className="sub">
                <h6>You rated 10 movies! Keep rating or </h6>
                <Link to="/profile">
                  <h6 className="link">See your profile</h6>
                </Link>
              </div>
            ) : (
              <div className="sub">
                <h6>
                  Rate at least 10 movies to get your personalized profile
                </h6>
              </div>
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
            <p>You rated {props.liked.length + props.disliked.length} / 10</p>
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

const Flex = styled.div`
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

const Header = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  color: ${primary.blue};
  padding: 0 2em;
  margin-bottom: 4em;

  .sub {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.25em;
  }

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media (max-width: 780px) {
    .sub {
      flex-direction: column;
    }

    h3 {
      font-size: 2rem;
      line-height: 2rem;
    }

    h6 {
      font-size: 1.125rem;
      line-height: 1.5rem;
      text-align: center;
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
  padding: 1em 1em 4em;

  @media (max-width: 640px) {
    flex-direction: column;

    p {
      font-size: 0.875rem;
      line-height: 3rem;
    }
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
