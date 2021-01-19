import React from "react";

//import libraries
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import Poster from "./Poster";

//import styles
import styled from "styled-components";

SwiperCore.use(Navigation, Pagination);

const Recommend = ({ data, title }) => {
  return (
    <Container>
      <h5>{title}</h5>
      <Swiper
        navigation
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          // when window width is >= 480px
          740: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          // when window width is >= 1012px
          1012: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Poster
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              // genre={getGenre(movie.genre_ids)}
              toDetail={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 2em 0;

  h5 {
    margin-bottom: 1em;
  }

  @media (max-width: 780px) {
    padding: 0;
  }
`;

export default Recommend;
