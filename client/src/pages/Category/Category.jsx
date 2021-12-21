import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

//components
import Placeholder from "../../components/placeholder/List";
import { Header } from "../../components/Header";
import { Grid2 } from "../../components/Grid";
import Poster from "../../components/Poster";

//util
import { getGenre } from "../../util/getGenres";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  discoverMoviesByCrew,
  discoverMoviesByGenre,
  discoverMoviesByKeyword,
  getACollection,
  getKeyword,
  getPersonDetail,
} from "../../redux/categoryRedux";
import { getGenres } from "../../redux/genreRedux";
import Pagination from "../../components/Pagination";
import { breakpoint } from "../../components/token";

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

    if (path === "collection") {
      dispatch(getACollection(id));
    }

    window.scrollTo(0, 0);
  }, [dispatch, id, page, path]);

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
    <>
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
                <mark className="highlight">
                  {path === "genre" ? handleGenre() : name}
                </mark>
              </>
            }
          />
          {results && results.length > 0 && (
            <Grid2>
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
            </Grid2>
          )}
          <Bottom>
            <Pagination
              page={page}
              total_pages={total_pages}
              handleNextPage={() => handlePage("next")}
              handlePrevPage={() => handlePage("prev")}
            />
          </Bottom>
        </>
      )}
    </>
  );
};

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 4rem;

  @media ${breakpoint.m} {
    flex-direction: column;

    div {
      padding: 1rem 0;
    }
  }
`;

export default Category;
