import React, { useEffect, useContext } from "react";
import { MovieContext } from "./contexts/MovieContext";
import { Layout, Typography, Card, Col, Row, message } from "antd";
import {
  StyledCard,
  StyledContent,
  StyledDetailsTitle as StyledTitle,
  StyledFooter,
  StyledInfoContainer as StyledPageHeader,
  StyledRate,
} from "./elements/MovieDetailsElements";
import DefaultMoviePoster from "../resources/images/default_movie_poster.jpg";
import CardActions from "@material-ui/core/CardActions";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Button from "@material-ui/core/Button";
import { UserContext } from "./contexts/UserContext";

const MovieDetails = (props) => {
  const {
    movieId,
    movieOriginalId,
    movieTitle,
    movieOverview,
    movieLanguages,
    movieGenres,
    movieReleaseDate,
    movieRuntime,
    movieVoteAverage,
    movieVoteCount,
    moviePoster,
    fetchMovieDetails,
    DOMAIN_STRING,
  } = useContext(MovieContext);

  const {
    addMovieToWatchList,
    addMovieToWatchListDb,
    getCurrentUser,
  } = useContext(UserContext);

  useEffect(() => {
    fetchMovieDetails(`${DOMAIN_STRING}moviedetails/${movieId}`);
  }, [fetchMovieDetails, movieId, DOMAIN_STRING]);

  const genres = movieGenres.map((item) => {
    return <div>{item}</div>;
  });

  const languages = movieLanguages.map((item) => {
    return <div>{item}</div>;
  });

  const movieObject = {
    id: movieId,
    originalId: movieOriginalId,
    originalTitle: movieTitle,
    overview: movieOverview,
    movieGenres: null,
    movieLanguages: null,
    releaseDate: movieReleaseDate,
    runtime: movieRuntime,
    voteAverage: movieVoteAverage,
    voteCount: movieVoteCount,
    popularity: null,
    posterPath: moviePoster,
  };

  const { Paragraph } = Typography;
  const { Meta } = Card;

  const clickedOnWatchlistBtn = (event) => {
    if (getCurrentUser()) {
      addMovieToWatchList(event, { id: movieId, movie: movieObject });
      addMovieToWatchListDb({
        userId: getCurrentUser().id,
        movieId: movieId,
        token: getCurrentUser().token,
      });
    } else {
      message.warning("You are not logged in!");
    }
  };

  return (
    <div>
      <Layout className="layout">
        <StyledContent>
          <StyledTitle>{movieTitle}</StyledTitle>
          <div className="site-layout-content">
            <Row>
              <div className="site-card-wrapper">
                <Col>
                  {moviePoster.length > 0 ? (
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={
                        <img
                          alt="poster"
                          src={`https://image.tmdb.org/t/p/w500${moviePoster}`}
                        />
                      }
                    >
                      <Meta title={movieTitle} description="www.dBMI.com" />
                    </Card>
                  ) : (
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="poster" src={DefaultMoviePoster} />}
                    >
                      <Meta title={movieTitle} description="www.imdb.com" />
                    </Card>
                  )}
                </Col>
              </div>
              <Col>
                <Row style={{ marginTop: "30px" }}>
                  <Col>
                    <StyledCard hoverable title="Release date" bordered={true}>
                      {movieReleaseDate}
                    </StyledCard>
                  </Col>
                  <Col>
                    <StyledCard hoverable title="Runtime" bordered={true}>
                      {movieRuntime}
                    </StyledCard>
                  </Col>
                  <Col>
                    <StyledCard hoverable title="Genres" bordered={true}>
                      {genres}
                    </StyledCard>
                  </Col>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                  <Col>
                    <StyledCard hoverable title="Languages" bordered={true}>
                      {languages}
                    </StyledCard>
                  </Col>
                  <Col>
                    <StyledCard hoverable title="Average vote" bordered={true}>
                      {movieVoteAverage}
                    </StyledCard>
                  </Col>
                  <Col>
                    <StyledCard hoverable title="All vote" bordered={true}>
                      {movieVoteCount}
                    </StyledCard>
                  </Col>
                </Row>
              </Col>
            </Row>
            <StyledRate></StyledRate>

            <StyledPageHeader title="Overview" className="site-page-header">
              <Paragraph style={{ textAlign: "left" }}>
                {movieOverview}
              </Paragraph>
            </StyledPageHeader>
            <CardActions
              style={{
                justifyContent: "center",
                color: "white",
                fontFamily: "Montserrat-Regular",
              }}
            >
              <div>Add to watchlist</div>
              <Button
                name={props.title}
                onClick={clickedOnWatchlistBtn}
                variant="contained"
                color="default"
              >
                <PlaylistAddIcon></PlaylistAddIcon>
              </Button>
            </CardActions>
          </div>
        </StyledContent>
        <StyledFooter>dBMI ©2020</StyledFooter>
      </Layout>
    </div>
  );
};

export default MovieDetails;
