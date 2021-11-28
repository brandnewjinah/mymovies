import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/List";
import { HeaderH2 } from "../../components/Header";
import { Grid } from "../../components/Grid";
import Poster from "../../components/RatePoster";
import Pagination from "../../components/Pagination";
import { breakpoint, size } from "../../components/token";

//util
import { getGenre } from "../../util/getGenres";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/movieRedux";
import { getGenres } from "../../redux/genreRedux";
import { dislikeMovie, likeMovie } from "../../redux/rateRedux";

const Rate = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getMovies({ selection: "revenue.desc", exclude: null, page: page })
    );
    dispatch(getGenres());
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  const { genres } = useSelector((state) => state.genres);
  const { results, loading } = useSelector((state) => state.movie);
  const { liked, disliked } = useSelector((state) => state.rate);

  const handlePage = (par) => {
    par === "next" && setPage(page + 1);
    par === "prev" && page > 1 && setPage(page - 1);
  };

  useEffect(() => {
    const totalRated = liked.length + disliked.length;
    setTotal(totalRated);
  }, [liked, disliked]);

  return (
    <>
      {loading ? (
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
          {results && results.length > 0 && (
            <Grid>
              {results.map((movie) => (
                <Poster
                  key={movie.id}
                  rate={true}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date}
                  genre={movie.genre_ids}
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
              page={page}
              handleNextPage={() => handlePage("next")}
              handlePrevPage={() => handlePage("prev")}
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
