import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/List";
import { Header } from "../../components/Header";
import { Grid } from "../../components/Grid";
import Poster from "../../components/Poster";
import { breakpoint } from "../../components/token";

//util
import { getGenre } from "../../util/getGenres";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  discoverMoviesByCrew,
  discoverMoviesByGenre,
  discoverMoviesByKeyword,
  getKeyword,
  getPersonDetail,
} from "../../redux/categoryRedux";
import { getGenres } from "../../redux/genreRedux";
import Pagination from "../../components/Pagination";

const Category = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());

    if (path === "director") {
      dispatch(getPersonDetail(id));
      dispatch(discoverMoviesByCrew({ id, page }));
    }

    if (path === "keyword") {
      dispatch(getKeyword(id));
      dispatch(discoverMoviesByKeyword({ id, page }));
    }

    if (path === "genre") {
      dispatch(discoverMoviesByGenre(id));
    }
  }, [dispatch, id, page]);

  const { genres } = useSelector((state) => state.genres);
  const { loading, name, results, total_pages } = useSelector(
    (state) => state.category
  );

  const handlePage = (par) => {
    par === "next" && setPage(page + 1);
    par === "prev" && page > 1 && setPage(page - 1);
  };

  const handleGenre = () => {
    const foundGenre = genres.find((item) => item.id === parseInt(id));

    return foundGenre.name;
  };

  return (
    <Container>
      {loading ? (
        <Placeholder />
      ) : (
        <>
          <Header
            title={
              <>
                <span>
                  {path === "director"
                    ? "Movies by "
                    : path === "keyword"
                    ? "Movies with keyword "
                    : null}
                </span>
                <span className="underline">
                  {path === "genre" ? handleGenre() : name}
                </span>
              </>
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
                  genre={getGenre(genres, movie.genre_ids)}
                />
              ))}
            </Grid>
          )}
          <Pagination
            page={page}
            total_pages={total_pages}
            handleNextPage={() => handlePage("next")}
            handlePrevPage={() => handlePage("prev")}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7rem auto;

  @media ${breakpoint.xlg} {
    padding: 0 2rem;
  }

  @media ${breakpoint.lg} {
    margin: 5rem auto;
  }

  @media ${breakpoint.m} {
    padding: 0 1rem;
  }
`;

export default Category;
