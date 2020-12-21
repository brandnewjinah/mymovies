import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ConPresenter from "./ConPresenter";

//redux
import { connect } from "react-redux";

const ConContainer = (props) => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    topRated: [],
    topRatedError: null,
    unRated: [],
    loading: true,
  });

  let [page, setPage] = useState(1);
  let [selection, setSelection] = useState("popularity.desc");
  let [exclude, setExclude] = useState("");

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [topRated, topRatedError] = await movieApi.rate(
        selection,
        exclude,
        page
      );

      const filtered = topRated.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );
      // filtered.map((m) => {
      //   unrate = [...unrate, m];
      // });

      // if (unrate.length < 10) {
      //   setPage(page + 1);
      //   const [topRated, topRatedError] = await movieApi.topRated(page);
      //   const filtered2 = topRated.filter(
      //     (d) =>
      //       !props.liked.find((id) => id.id === d.id) &&
      //       !props.disliked.find((id) => id.id === d.id)
      //   );
      //   console.log(filtered2);
      // }

      // if moview.unRated.length < 10, add 1 to page, go back to filtered

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        topRated,
        topRatedError,
        unRated: filtered,
      });
      window.scrollTo(0, 0);
    };
    getData();
  }, [selection, page, exclude]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <ConPresenter
      nextPage={nextPage}
      fireSelection={(s) => setSelection(s)}
      fireExclusion={(s) => setExclude(s)}
      firePage={(s) => setPage(s)}
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
