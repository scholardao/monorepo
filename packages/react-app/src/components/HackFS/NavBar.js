import { Grid, Drawer, List, ListItem, Button, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SchoolLogo from "../../assets/school.svg";
import { useLocation } from "react-router-dom";

const drawerWidth = 250;
const drawerColor = "#363740";
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: drawerColor,
  },
  drawer: {
    width: drawerWidth,
  },

  drawerContainer: {
    width: "100%",
  },
  drawerText: {
    color: "#DDE2FF",
    flexGrow: 1,
    paddingLeft: "10px",
  },
  drawerSection: {
    color: "#DDE2FF",
    flexGrow: 1,
    paddingLeft: "30px",
  },
  drawerSectionActive: {
    color: "#DDE2FF",
    flexGrow: 1,
    paddingLeft: "30px",
    backgroundColor: "#9FA2B4",
  },
  title: {
    height: "100px",
    borderColor: "red",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{ paper: classes.drawerPaper }}>
      <Grid container>
        <Grid item container className={classes.title} justify="center" alignItems="center">
          {/* <Grid item> */}
          <img src={SchoolLogo} alt="School Logo" />
          {/* </Grid> */}
          <Grid item>
            <Typography className={classes.drawerText}>ScholarDao</Typography>
          </Grid>
        </Grid>
        <List component={Grid} container>
          <ListItem
            button
            component="a"
            href="/app/papers"
            className={location.pathname.includes("papers") ? classes.drawerSectionActive : classes.drawerSection}
          >
            {/* <img
            style={{ fill: "gray" }}
            src={Logo}
            boxSize="16px"
            alt="Paper logo"
            viewBox="0 0 16 16"
          /> */}
            <ListItemText className={classes.drawerText}>Papers</ListItemText>
          </ListItem>
          <ListItem
            button
            component="a"
            href="/app/upload"
            className={location.pathname.includes("upload") ? classes.drawerSectionActive : classes.drawerSection}
          >
            <ListItemText className={classes.drawerText}>Upload a paper</ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Drawer>
  );
}
