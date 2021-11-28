import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import Continue from "./Continue";
import { getGenres } from "../../redux/genreRedux";
import { getMovies } from "../../redux/movieRedux";

const ContinueContainer = (props) => {
  const dispatch = useDispatch();

  let [selection, setSelection] = useState("popularity.desc");
  let [exclude, setExclude] = useState("");
  let [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getMovies({ selection: selection, exclude: exclude, page: page }));
    window.scrollTo(0, 0);
  }, [selection, page, exclude]);

  const handlePage = (par) => {
    par === "next" && setPage(page + 1);
    par === "prev" && page > 1 && setPage(page - 1);
  };

  const { genres } = useSelector((state) => state.genres);
  const { results } = useSelector((state) => state.movie);

  return (
    <Continue
      handleSelectSort={(path) => setSelection(path)}
      handleSetExclude={(s) => setExclude(s)}
      handleSetPage={(page) => setPage(page)}
      handlePage={(page) => handlePage(page)}
      page={page}
      results={results}
      genres={genres}
    />
  );
};

export default ContinueContainer;
