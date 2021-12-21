import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import Rate from "./Rate";
import { getGenres } from "../../redux/genreRedux";
import { getMovies } from "../../redux/movieRedux";

const RateContainer = () => {
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(
      getMovies({ selection: "revenue.desc", exclude: null, page: page })
    );
    window.scrollTo(0, 0);
  }, [dispatch, page]);

  const handlePage = (par) => {
    par === "next" && setPage(page + 1);
    par === "prev" && page > 1 && setPage(page - 1);
  };

  const { genres } = useSelector((state) => state.genres);
  const { results } = useSelector((state) => state.movie);

  return (
    <Rate
      handleSetPage={(page) => setPage(page)}
      handlePage={(page) => handlePage(page)}
      page={page}
      results={results}
      genres={genres}
    />
  );
};

export default RateContainer;
