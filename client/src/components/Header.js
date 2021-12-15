import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const Header = ({ setIndex }) => {
  const classes = useStyles();

  const menuId = "primary-search-account-menu";
  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            乖寶寶簽到網
          </Typography>
          <div className={classes.grow} />
          <Link
            to="/"
            style={{ textDecoration: "none", color: "#fff", outline: "none" }}
            onClick={() => setIndex(-1)}
          >
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
