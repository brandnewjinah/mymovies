import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../../api";
import { useParams, useLocation } from "react-router-dom";

import DetailPresenter from "./DetailPresenter";

//import styles
import styled from "styled-components";

const DetailContainer = ({ pathname }) => {
  let { id } = useParams();
  let location = useLocation();

  const [detail, setDetail] = useState({
    loading: true,
    result: {},
    resultError: null,
    similar: [],
    similarError: null,
    keyword: [],
    keywordError: null,
    id: id,
  });

  const getData = async () => {
    const [result, resultError] = location.pathname.includes("/movie/")
      ? await movieApi.movie(id)
      : await tvApi.show(id);
    const [similar, similarError] = location.pathname.includes("/movie/")
      ? await movieApi.similar(id)
      : await tvApi.similar(id);
    const [keyword, keywordError] = location.pathname.includes("/movie/")
      ? await movieApi.keyword(id)
      : await tvApi.keyword(id);

    setDetail({
      result,
      resultError,
      similar,
      similarError,
      keyword,
      keywordError,
      loading: false,
    });
  };

  useEffect(() => {
    getData();
  }, [id]);

  return <DetailPresenter {...detail} />;
};

export default DetailContainer;
