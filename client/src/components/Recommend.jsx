import React from "react";
import styled from "styled-components";

//import libraries
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import Poster from "./Poster";

import { breakpoint, primaryColors } from "./token";

SwiperCore.use(Navigation, Pagination);

const Recommend = ({ data, title, genres }) => {
  return (
    <Container>
      <h6>{title}</h6>
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
  color: ${primaryColors.blue};

  h6 {
    font-size: 1.15rem;
    margin-bottom: 1.5em;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 100%;
    color: #ed798c;
    transform: translate(0, -50%);
    padding: 5px;

    &:after {
      font-size: 22px;
    }
  }

  @media ${breakpoint.m} {
    h6 {
      font-size: 1.125rem;
    }
  }
`;

export default Recommend;
