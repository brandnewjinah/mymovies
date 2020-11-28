import React, { useState, useEffect } from "react";
import { tvApi } from "../../api";

import TVPresenter from "./TVPresenter";

const TVContainer = () => {
  const [tv, setTv] = useState({
    today: [],
    popular: [],
    topRated: [],
    thisWeek: [],
    todayError: null,
    popularError: null,
    topRatedError: null,
    thisWeekError: null,
    loading: true,
  });

  const getData = async () => {
    const [today, todayError] = await tvApi.today();
    const [popular, popularError] = await tvApi.popular();
    const [topRated, topRatedError] = await tvApi.topRated();
    const [thisWeek, thisWeekError] = await tvApi.thisWeek();
    setTv({
      loading: false,
      today,
      popular,
      topRated,
      thisWeek,
      todayError,
      popularError,
      topRatedError,
      thisWeekError,
    });
    console.log(today.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return <TVPresenter {...tv} />;
};

export default TVContainer;
