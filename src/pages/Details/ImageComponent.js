import React from "react";

//import libraries
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

//import styles
import styled from "styled-components";
import { Play } from "../../assets/Icons";

const ImageComponent = ({ img, video, isOpen, handleOpen, handleClose }) => {
  return (
    <Container>
      <Image
        src={
          img
            ? `https://image.tmdb.org/t/p/original${img}`
            : "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"
        }
      />
      {video && video.length > 0 && (
        <>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={isOpen}
            videoId={video[0].key}
            onClose={handleClose}
          />
          <Video onClick={handleOpen}>
            <Play width="50" height="50" fill="#eee" />
          </Video>
        </>
      )}
    </Container>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Video = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 0.6;
  }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default ImageComponent;
