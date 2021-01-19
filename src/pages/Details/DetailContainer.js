import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import { useParams, useLocation } from "react-router-dom";

import DetailPresenter from "./DetailPresenter";

const DetailContainer = ({ pathname }) => {
  let { id } = useParams();
  let location = useLocation();

  const [detail, setDetail] = useState({
    loading: true,
    id: id,
    result: {},
    resultError: null,
    recommend: [],
    recommendError: null,
    keyword: [],
    keywordError: null,
    credits: {},
    creditsError: null,
  });

  useEffect(() => {
    const getData = async () => {
      const [result, resultError] = location.pathname.includes("/movie/")
        ? await movieApi.movie(id)
        : await tvApi.show(id);
      const [recommend, recommendError] = location.pathname.includes("/movie/")
        ? await movieApi.recommend(id)
        : await tvApi.recommend(id);
      const [keyword, keywordError] = location.pathname.includes("/movie/")
        ? await movieApi.keyword(id)
        : await tvApi.keyword(id);
      const [credits, creditsError] = await movieApi.credits(id);

      const filtered =
        credits.crew && credits.crew.find((c) => c.job === "Director");

      setDetail({
        loading: false,
        result,
        resultError,
        recommend,
        recommendError,
        keyword,
        keywordError,
        credits: filtered,
        creditsError,
      });

      window.scrollTo(0, 0);
    };

    getData();
  }, [id, location.pathname]);

  return <DetailPresenter {...detail} />;
};

export default DetailContainer;
