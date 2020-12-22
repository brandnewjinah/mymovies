import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { movieApi } from "../../api";

//import utils
import { getGenre } from "../../util/GetGenres";

//import components
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";
import Indicator from "../../components/Indicator";

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

  // Find out previous count
  // if total rated count reaches 30 from 29, create a burst animation

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCount = usePrevious(total);

  const burst = {
    color: primary.green,
  };

  return props.loading ? (
    <Indicator />
  ) : (
    <Container>
      <Header>
        <h2>
          <span
            style={
              total < 30
                ? { color: primary.yellow }
                : prevCount === 29
                ? burst
                : null
            }
          >
            {total}
          </span>
          <span> / 30</span>
        </h2>
        {total >= 30 ? (
          <div className="section">
            <h5>You rated 30 movies! Keep rating or </h5>
            <Link to="/profile">
              <h5 className="link">See your profile</h5>
            </Link>
          </div>
        ) : (
          <h5>Please rate at least 30 movies to get started</h5>
        )}
      </Header>

      {props.topRated && props.topRated.length > 0 && (
        <Section>
          {props.topRated.map((movie) => (
            <PosterList
              key={movie.id}
              rate={true}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              genre={getGenre(props.genres, movie.genre_ids)}
              liked={
                props.liked && props.liked.find((item) => item.id === movie.id)
              }
              disliked={
                props.disliked &&
                props.disliked.find((item) => item.id === movie.id)
              }
              onClick1={() => handleLike(movie)}
              onClick2={() => handleDislike(movie)}
            />
          ))}
        </Section>
      )}

      <Footer>
        <p>You rated {props.liked.length + props.disliked.length} / 30</p>
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
  padding: 2em 0;
  margin: 5em auto 0;
`;

const Header = styled(Flex)`
  justify-content: center;
  flex-direction: column;
  color: ${primary.blue};

  .section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25em 0;
  }

  .link {
    border-bottom: 3px solid #172d6e;
    margin-left: 6px;
  }

  @media (max-width: 640px) {
    h5 {
      font-size: 1.125rem;
      text-align: center;
    }

    .section {
      flex-direction: column;
      padding: 1.25em 1em;
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
