import React, { useEffect } from "react";

//comp
import Profile from "./Profile";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/genreRedux";

const ProfileContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const { genres, loading } = useSelector((state) => state.genres);
  const { liked, disliked } = useSelector((state) => state.rate);
  const { myKeywords } = useSelector((state) => state.keyword);

  const total = liked.length + disliked.length;

  return (
    <Profile
      loading={loading}
      genres={genres}
      total={total}
      liked={liked}
      disliked={disliked}
      myKeywords={myKeywords}
    />
  );
};

export default ProfileContainer;
