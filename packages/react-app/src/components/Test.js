import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Drawer,
  List,
  ListItem,
  Button,
  ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Logo from "../assets/document.svg";
import SchoolLogo from "../assets/school.svg";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import PaperDashboard from "./PaperDashboard";
import Author from "./AuthorPage";
const drawerWidth = 250;
const drawerColor = "#363740";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#F7F8FC",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: drawerColor,
  },
  drawerContainer: {
    width: "100%",
  },
  drawerText: {
    color: "#A4A6B3",
    flexGrow: 1,
    paddingLeft: "10px",
  },
  drawerSection: {
    color: "#A4A6B3",
    flexGrow: 1,
    paddingLeft: "30px",
  },
  title: {
    height: "100px",
    borderColor: "red",
  },
}));

export default function Test() {
  const classes = useStyles();

  return (
    <Box component={ThemeProvider} theme={themeLight} sx={{ display: "flex" }}>
      <CssBaseline />
      <Grid container>
        <Grid item>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <Grid container>
              <Grid
                item
                container
                className={classes.title}
                justify="center"
                alignItems="center"
              >
                {/* <Grid item> */}
                <img src={SchoolLogo} alt="School Logo" />
                {/* </Grid> */}
                <Grid item>
                  <Typography className={classes.drawerText}>
                    ScholarDao
                  </Typography>
                </Grid>
              </Grid>
              <List component={Grid} container>
                <ListItem
                  button
                  component="a"
                  href="/a"
                  className={classes.drawerSection}
                >
                  {/* <img
                    style={{ fill: "gray" }}
                    src={Logo}
                    boxSize="16px"
                    alt="Paper logo"
                    viewBox="0 0 16 16"
                  /> */}
                  <ListItemText className={classes.drawerText}>
                    Papers
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component="a"
                  href="/a"
                  // action="/haha"
                  className={classes.drawerSection}
                >
                  <ListItemText className={classes.drawerText}>
                    Account Profile
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Drawer>
        </Grid>
        <Grid item className={classes.root}>
          <Author />
        </Grid>
        {/* <PaperDashboard rows={rows} /> */}
      </Grid>
    </Box>
  );
}