import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { movieApi } from "../../api";
import Helmet from "react-helmet";

//import utils
import { getGenre } from "../../util/GetGenres";

//import components
import { Grid } from "../../components/Grid";
import RatePoster from "../../components/RatePoster";
import Placeholder from "../../components/placeholders/List";
import Dropdown from "../../components/Dropdown";
import { RatePagination } from "../../components/Pagination";

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
      borderBottom: `2px solid #172d6e`,
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
      fontSize: `1rem`,
    }),
  };
  return (
    <Container>
      {props.loading ? (
        <>
          <Placeholder />
          <Helmet>
            <title>Loading | Movie Rate</title>
          </Helmet>
        </>
      ) : (
        <>
          <Helmet>
            <title>Rate | My Movies</title>
          </Helmet>
          <Header>
            <h4>Rate more movies</h4>
            <div style={{ display: `flex`, marginTop: `.25em` }}>
              <Dropdown
                selected={selected}
                data={dropdown}
                handleSelection={(d) => handleSelection(d)}
              />
            </div>
            <Multi>
              <p>Exclude</p>
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
            ></div>
          </Header>

          {props.results && props.results.length > 0 && (
            <Grid>
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
                    props.liked &&
                    props.liked.find((item) => item.id === movie.id)
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
            </Grid>
          )}
          <RatePagination
            handleNext={props.nextPage}
            liked={props.liked.length}
            disliked={props.disliked.length}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 7em auto;
  color: ${primary.blue};

  @media (max-width: 1200px) {
    padding: 0 2em;
  }

  @media (max-width: 425px) {
    padding: 0 1em;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Flex)`
  flex-direction: column;
  color: ${primary.blue};
  padding: 3em 0 2em;

  @media (max-width: 768px) {
    padding: 1em 0;

    h4 {
      font-size: 1.75rem;
    }
  }
`;

const Multi = styled(Flex)`
  width: 100%;
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
