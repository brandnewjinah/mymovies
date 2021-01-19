import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ConPresenter from "./ConPresenter";

//redux
import { connect } from "react-redux";

const ConContainer = (props) => {
  const [movies, setMovies] = useState({
    loading: true,
    genres: [],
    genresError: null,
    results: [],
    resultsError: null,
  });

  let [selection, setSelection] = useState("popularity.desc");
  let [exclude, setExclude] = useState("");
  let [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();

      //get movies based on user selection
      const [results, resultsError] = await movieApi.rate(
        selection,
        exclude,
        page
      );

      const filtered = results.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        results: filtered,
        resultsError,
      });
      window.scrollTo(0, 0);
    };
    getData();
  }, [selection, page, exclude, props.liked, props.disliked]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <ConPresenter
      nextPage={nextPage}
      handleSort={(s) => setSelection(s)}
      handleExclusion={(s) => setExclude(s)}
      handlePage={(num) => setPage(num)}
      page={page}
      {...movies}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default connect(mapStateToProps, null)(ConContainer);
