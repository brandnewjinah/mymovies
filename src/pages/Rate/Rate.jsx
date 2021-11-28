import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//import utils
import { getGenre } from "../../util/getGenres";

//components
import Placeholder from "../../components/placeholder/List";
import { HeaderH2 } from "../../components/Header";
import { Grid } from "../../components/Grid";
import Poster from "../../components/RatePoster";
import Pagination from "../../components/Pagination";
import { breakpoint, size } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { dislikeMovie, likeMovie } from "../../redux/rateRedux";

const Rate = (props) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const { liked, disliked } = useSelector((state) => state.rate);

  useEffect(() => {
    const totalRated = liked.length + disliked.length;
    setTotal(totalRated);
  }, [liked, disliked]);

  return (
    <>
      {props.loading ? (
        <Placeholder />
      ) : (
        <Container>
          <HeaderH2
            title={
              <>
                <span className="secondary">{total}</span>
                <span> / 10</span>
              </>
            }
            subtitle={
              total > 9 ? (
                <>
                  You rated 10 movies! Keep rating or
                  <Link to="/movies/profile">
                    <span className="link">See your profile</span>
                  </Link>
                </>
              ) : (
                "Rate at least 10 movies to get your personalized profile"
              )
            }
          />
          {props.results && props.results.length > 0 && (
            <Grid>
              {props.results.map((movie) => (
                <Poster
                  key={movie.id}
                  rate={true}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={getGenre(props.genres, movie.genre_ids)}
                  liked={liked && liked.find((item) => item.id === movie.id)}
                  disliked={
                    disliked && disliked.find((item) => item.id === movie.id)
                  }
                  handleLike={() => dispatch(likeMovie(movie.id))}
                  handleDislike={() => dispatch(dislikeMovie(movie.id))}
                />
              ))}
            </Grid>
          )}
          <Bottom>
            <span>You rated {total} / 10</span>
            <Pagination
              page={props.page}
              handleNextPage={() => props.handlePage("next")}
              handlePrevPage={() => props.handlePage("prev")}
            />
          </Bottom>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: ${size.xlg};
  margin: 7em auto 0;

  @media ${breakpoint.m} {
    padding: 0 1rem;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 4rem;

  @media ${breakpoint.m} {
    flex-direction: column;

    div {
      padding: 1rem 0;
    }
  }
`;

export default Rate;
