import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ApartmentIcon from "@material-ui/icons/Apartment";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    position: "fixed",
    width: "100%",
    bottom: 0,
    left: 0,
  },
});

const BottomNav = ({ setIndex, index }) => {
  const classes = useStyles();
  const changeRoute = (val) => {
    setIndex(val);
  };
  return (
    <BottomNavigation
      value={index}
      onChange={(event, newValue) => {
        changeRoute(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="兌換中心"
        component={Link}
        to={"/Rewards"}
        icon={<ApartmentIcon />}
      />
      <BottomNavigationAction
        label="抽獎"
        component={Link}
        to={"/Playground"}
        icon={<SportsEsportsIcon />}
      />
      <BottomNavigationAction
        label="物品欄"
        component={Link}
        to={"/Inventory"}
        icon={<LocalMallIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
