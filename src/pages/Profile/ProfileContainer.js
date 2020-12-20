import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";

import ProfilePresenter from "./ProfilePresenter";

//redux
import { connect } from "react-redux";

const ProfileContainer = (props) => {
  const [movies, setMovies] = useState({
    genres: [],
    genresError: null,
    discovered: [],
    discoveredError: null,
    discoveredLan: [],
    discovereLanError: null,
    unRated: [],
    loading: true,
  });

  const [genId, setGenId] = useState("");
  const [lanId, setLanId] = useState("");

  useEffect(() => {
    const getData = async () => {
      const [genres, genresError] = await movieApi.genre();
      const [discovered, discoveredError] = await movieApi.discover(genId);
      const [discoveredLan, discovereLanError] = await movieApi.foreign(lanId);

      const filtered = discovered.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      const filteredLn = discoveredLan.filter(
        (d) =>
          !props.liked.find((id) => id.id === d.id) &&
          !props.disliked.find((id) => id.id === d.id)
      );

      setMovies({
        loading: false,
        genres: genres.genres,
        genresError,
        discovered,
        discoveredError,
        discoveredLan: filteredLn,
        discovereLanError,
        unRated: filtered,
      });
    };
    getData();
  }, [genId, lanId]);

  const recommendGen = (gn) => {
    setGenId(gn.toString());
  };

  const recommendLan = (lan) => {
    setLanId(lan.toString());
  };

  return (
    <ProfilePresenter
      topGenres={(gn) => recommendGen(gn)}
      topLan={(lan) => recommendLan(lan)}
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

export default connect(mapStateToProps, null)(ProfileContainer);
