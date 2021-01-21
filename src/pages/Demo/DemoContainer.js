import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import DemoPresenter from "./DemoPresenter";

const DemoContainer = () => {
  const [movies, setMovies] = useState({
    loading: true,
    genres: [],
    genresError: null,
  });

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
      });
      window.scrollTo(0, 0);
    };

    getData();
  }, []);

  return <DemoPresenter {...movies} />;
};

export default DemoContainer;
