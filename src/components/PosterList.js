import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//import styles and assets
import styled from "styled-components";
import { Heart, BrokenHeart, Film } from "../assets/Icons";
import { primary } from "./Colors";

const Poster = ({
  id,
  rate,
  imageUrl,
  liked,
  disliked,
  title,
  year,
  genre,
  onClick1,
  onClick2,
  toDetail,
}) => {
  const history = useHistory();
  const [errImg, setErrImg] = useState(false);

  const handleDefaultImg = (e) => {
    if (e.type === "error") {
      setErrImg(true);
    }
  };

  const pushTo = () => {
    history.push(`/movie/${id}`);
  };

  return (
    // <Link to={toDetail && `/movie/${id}`}>
    <Container onClick={toDetail && pushTo}>
      <ImageContainer>
        {errImg ? (
          <ErrorImg>
            <Film width="24" height="24" color="#000" stroke="2" />
          </ErrorImg>
        ) : (
          <Image
            onError={handleDefaultImg}
            src={
              imageUrl
                ? `https://image.tmdb.org/t/p/w500${imageUrl}`
                : setErrImg(true)
            }
          />
        )}
        {rate && (
          <Rating>
            <div
              style={liked ? { backgroundColor: primary.green } : null}
              onClick={() => onClick1()}
            >
              <Heart width="26" height="26" fill="#fff" />
            </div>
            <div
              style={disliked ? { backgroundColor: "#de7747" } : null}
              onClick={() => onClick2()}
            >
              <BrokenHeart width="26" height="26" fill="#fff" />
            </div>
          </Rating>
        )}
      </ImageContainer>

      <Detail onClick={pushTo}>
        <h6>{title.length > 13 ? `${title.substring(0, 15)}...` : title}</h6>
        <p>{year.substring(0, 4)}</p>
        {/* <p>
            {genre && genre.join(" \u00B7 ").length > 18
              ? `${genre.join(" \u00B7 ").substring(0, 18)}...`
              : genre.join(" \u00B7 ")}
          </p> */}
        <p>
          {genre && genre.join(" \u00B7 ").length > 18
            ? `${genre && genre.join(" \u00B7 ").substring(0, 18)}...`
            : genre && genre.join(" \u00B7 ")}
        </p>
      </Detail>
    </Container>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* background-color: Gainsboro; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  object-fit: cover;
  /* object-fit: contain; */
  border-radius: 8px;
  transition: opacity 0.1s linear;
`;

const ErrorImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 202px;
  height: 304px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Rating = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  display: flex;

  div {
    margin: 0 1em;
    padding: 1em;
    cursor: pointer;
    background-color: #999999;
    border-radius: 100%;
    display: flex;
  }
`;

const ImageContainer = styled.div`
  height: 74%;
  position: relative;
  /* background-color: magenta; */

  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Rating} {
      opacity: 1;
    }
  }
`;

const Detail = styled(Flex)`
  width: 100%;
  height: 26%;
  flex-direction: column;
  padding-bottom: 1em;
  cursor: pointer;
  /* background-color: coral; */

  h6 {
    margin: 0.5em 0 0.25em;
  }

  p {
    font-size: 0.75rem;
    line-height: 1.25rem;
  }

  @media (max-width: 640px) {
    h6 {
      font-size: 0.875rem;
    }
  }
`;

Poster.propTyes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
};

export default Poster;
