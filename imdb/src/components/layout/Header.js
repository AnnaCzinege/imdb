import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { LayoutContext } from "./LayoutContext";
import { SearchMoviesContext } from "../SearchMoviesContext";
import ToggleBtn from "../../ToggleBtn.png";
import Logo from "../../Logo.png";
import SearchIcon from "../../SearchIcon.png";
import StyledHeader from "../elements/header_elements/HeaderStyle";
import StyledHeaderItem from "../elements/header_elements/HeaderItemStyle";
import StyledLogo from "../elements/header_elements/HeaderLogoStyle";
import StyledToggleBtn from "../elements/header_elements/HeaderToggleBtnStyle";
import StyledInput from "../elements/header_elements/HeaderInputStyle";
import StyledSearchIcon from "../elements/header_elements/HeaderSearchIconStyle";
import { message } from "antd";
import StyledLink from "../elements/header_elements/HeaderLinkStyle";

const Header = props => {
  const { setIsOpen } = useContext(LayoutContext);
  const { allMovies } = useContext(SearchMoviesContext);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [redirect, setRedirect] = useState("");

  const onClick = () => {
    setIsOpen("15%");
  };

  const onSearchChange = e => {
    setSearchedTitle(e.target.value);
  };

  const searchBasedOnTitle = e => {
    e.preventDefault();
    let isFound = false;
    allMovies.forEach(element => {
      element.forEach(movie => {
        if (
          movie.title.toString().toLowerCase() === searchedTitle.toLowerCase()
        ) {
          isFound = true;
          setSearchedTitle("");
          return setRedirect(
            <Redirect
              to={{ pathname: `/movie/${movie.id}`, state: { id: movie.id } }}
            ></Redirect>
          );
        }
      });
    });
    if (!isFound) {
      return message.warning(
        `Couldn't find the movie titled: ${searchedTitle}`,
        1
      );
    }
  };

  return (
    <StyledHeader>
      {redirect}
      <StyledHeaderItem>
        <StyledLink to="/">
          <StyledLogo src={Logo} alt=""></StyledLogo>
        </StyledLink>
      </StyledHeaderItem>
      <StyledHeaderItem onClick={onClick}>
        <StyledToggleBtn src={ToggleBtn} alt=""></StyledToggleBtn> Menu
      </StyledHeaderItem>
      <StyledHeaderItem primary>
        <form onSubmit={searchBasedOnTitle}>
          <StyledInput
            type="text"
            placeholder="Search..."
            value={searchedTitle}
            onChange={onSearchChange}
          ></StyledInput>
        </form>
      </StyledHeaderItem>
      <StyledHeaderItem>
        <StyledSearchIcon
          src={SearchIcon}
          alt=""
          onClick={searchBasedOnTitle}
        ></StyledSearchIcon>
      </StyledHeaderItem>
      <StyledHeaderItem>IMDbPRO</StyledHeaderItem>
      <StyledHeaderItem>
        <StyledLink to="/watchlist">WatchList</StyledLink>
      </StyledHeaderItem>
      <StyledHeaderItem>Sign In</StyledHeaderItem>
    </StyledHeader>
  );
};

export default Header;
