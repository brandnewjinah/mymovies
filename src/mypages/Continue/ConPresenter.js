import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

//import components
import { Section } from "../../components/Section2";
import PosterList from "../../components/PosterList";
import Indicator from "../../components/Indicator";
import Dropdown from "../../components/Dropdown";

//redux
import { connect } from "react-redux";
import { likeItem, dislikeItem } from "../../store/movies";

//import styles and assets
import styled from "styled-components";

//data
const data = [
  { name: "By Popularity", path: "popularity.desc" },
  { name: "By Vote Average", path: "vote_average.desc" },
  { name: "By Vote Count", path: "vote.count.desc" },
];

const genre = [
  { value: "Front-end", label: "Front-end", color: "#00B8D9" },
  { value: "Back-end", label: "Back-end", color: "#5243AA" },
  { value: "UX/UI", label: "UX/UI", color: "#FF5630" },
  {
    value: "Product Management",
    label: "Product Management",
    color: "#FF8B00",
  },
  { value: "Marketing", label: "Marketing", color: "#FFC400" },
  { value: "HR", label: "HR", color: "#36B37E" },
];

const ConPresenter = (props) => {
  const [selected, setSelected] = useState(data[0].name);
  const handleLike = (movie) => {
    props.likeItem(movie);
  };

  const handleDislike = (movie) => {
    props.dislikeItem(movie);
  };

  const handleGenre = (genre) => {
    if (genre) {
      const genres = genre.map((g) => {
        const found = props.genres.find((item) => item.id === g);
        return found.name;
      });
      return genres.slice(0, 2);
    }
  };

  const handleSelection = (d) => {
    setSelected(d.name);
    props.fireSelection(d.path);
  };

  const handleChange = (value) => {
    if (value === null) {
      props.fireExclusion("");
    } else {
      const result = value.map((o) => o.id);
      props.fireExclusion(result.toString());
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
        <h2>Rate more movies</h2>
        <div style={{ display: `flex`, marginTop: `1em` }}>
          <Dropdown
            selected={selected}
            data={data}
            handleSelection={(d) => handleSelection(d)}
          />
        </div>
        <Multi>
          <h4>But don't show me</h4>
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

      {props.unRated && props.unRated.length > 0 && (
        <Section>
          {props.unRated.map((movie) => (
            <PosterList
              key={movie.id}
              rate={true}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              year={movie.release_date}
              genre={handleGenre(movie.genre_ids)}
              liked={
                props.liked && props.liked.find((item) => item.id === movie.id)
              }
              disliked={
                props.disliked &&
                props.disliked.find((item) => item.id === movie.id)
              }
              onClick1={() => handleLike(movie)}
              onClick2={() => handleDislike(movie)}
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
  margin: 6em auto;
  width: 100%;
  max-width: 1260px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
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
  topRated: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    liked: state.liked,
    disliked: state.disliked,
  };
};

export default connect(mapStateToProps, { likeItem, dislikeItem })(
  ConPresenter
);
