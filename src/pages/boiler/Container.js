import React, { useEffect } from "react";
// import {} from "../../services/api";

//import components
import Presenter from "./Presenter";

const Container = () => {
  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return <Presenter />;
};

export default Container;
