import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { movieApi } from "../../api";

//import utils
import { getGenre } from "../../util/GetGenres";

//import components
import { Section } from "../../components/Section2";
import RatePoster from "../../components/RatePoster";
import Indicator from "../../components/Indicator";
import Dropdown from "../../components/Dropdown";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles and assets
import styled from "styled-components";
import { primary } from "../../components/Colors";

//data
import { dropdown } from "../../data/options";

const ConPresenter = (props) => {
  const [selected, setSelected] = useState(dropdown[0].name);

  const handleLike = async (movie) => {
    const credits = await movieApi.credits(movie.id);

    const director =
      credits &&
      credits[0].crew &&
      credits[0].crew.find((c) => c.job === "Director");

    const likedMovie = {
      ...movie,
      director: { id: director.id, name: director.name },
    };

    props.likeItem(likedMovie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  const handleSelection = (d) => {
    setSelected(d.name);
    if (d.name === "Random") {
      let random = Math.floor(Math.random() * 404);
      props.handlePage(random);
    } else {
      props.handleSort(d.path);
    }
  };

  const handleChange = (value) => {
    if (value === null) {
      props.handleExclusion("");
    } else {
      const result = value.map((o) => o.id);
      props.handleExclusion(result.toString());
    }
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      border: 0,
      borderRadius: 0,
      borderBottom: `3px solid #172d6e`,
      boxShadow: "none",
      paddingTop: `2px`,
      minWidth: `auto`,
    }),
    placeholder: (styles) => ({
      ...styles,
      fontSize: `1rem`,
      position: `static`,
      top: `auto`,
      transform: `none`,
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: `transparent`,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: `#de576d`,
      fontSize: `1.05rem`,
    }),
  };
  return props.loading ? (
    <Indicator />
  ) : (
    <Container>
      <Header>
        <h3>Rate more movies</h3>
        <div style={{ display: `flex`, marginTop: `1em` }}>
          <Dropdown
            selected={selected}
            data={dropdown}
            handleSelection={(d) => handleSelection(d)}
          />
        </div>
        <Multi>
          <h4>Exclude</h4>
          <div>
            <Select
              isMulti
              menuPlacement="auto"
              menuPosition="fixed"
              placeholder="Select genres"
              styles={customStyles}
              defaultValue={[]}
              options={props.genres.map((item) => ({
                label: item.name,
                value: item.name,
                id: item.id,
              }))}
              onChange={handleChange}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                ClearIndicator: () => null,
              }}
            />
          </div>
        </Multi>
        <div
          style={{
            display: "flex",
          }}
        >
          {/* <Button onClick={props.nextPage}>More</Button> */}
        </div>
      </Header>

      {props.results && props.results.length > 0 && (
        <Section>
          {props.results.map((movie) => (
            <RatePoster
              key={movie.id}
              rate={true}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              genre={getGenre(props.genres, movie.genre_ids)}
              liked={
                props.liked && props.liked.find((item) => item.id === movie.id)
              }
              disliked={
                props.disliked &&
                props.disliked.find((item) => item.id === movie.id)
              }
              onClick1={() => handleLike(movie)}
              onClick2={() => handleDislike(movie)}
              isRate={true}
            />
          ))}
        </Section>
      )}

      <Footer>
        <div>You rated {props.liked.length + props.disliked.length}</div>
        <Button onClick={props.nextPage}>More</Button>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;
  color: ${primary.blue};
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;

  h3 {
    font-size: 2rem;
    font-weight: 600;
  }

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }

  @media (max-width: 780px) {
    text-align: center;
  }
`;

const Multi = styled(Flex)`
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: transparent;
  font-family: "Poppins", sans-serif;
  color: #172d6e;
  font-size: 1.125rem;
  font-weight: 400;
  border-bottom: 3px solid #172d6e;
  margin: 0 0.5em;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

ConPresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.rate.liked,
    disliked: state.rate.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  ConPresenter
);
