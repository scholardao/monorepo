import React from "react";
import PaperDashboard from "./PaperDashboard";
import { Grid, Typography } from "@material-ui/core";
import exampleprofile from "../assets/exampleprofile.svg";
import { makeStyles } from "@material-ui/core/styles";
function createData(title, authors, submitted, status) {
  return { title, authors, submitted, status };
}

const rows = [
  createData(
    "Protocol-based Smart Contract Generation",
    "Ferdinand",
    "May 26, 2019",
    "Preprint"
  ),
  createData(
    "Difference sets and the metric theory of small gaps",
    "Ferdinand",
    "May 26, 2019",
    "Published"
  ),
  createData(
    "The Gostman-Linial Conjecture is False",
    "Ferdinand",
    "May 26, 2019",
    "Preprint"
  ),
];

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: "50%",
    marginBottom: "20px",
  },
  authorDescription: {
    marginBottom: "10px",
  },
}));
export default function AuthorPage() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction="column">
        <Grid container item align="left" spacing="3">
          <Grid item>
            <img
              src={exampleprofile}
              className={classes.image}
              alt="example profile"
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" className={classes.authorDescription}>
              JONES FERDINAND
            </Typography>
            <Typography className={classes.authorDescription}>
              Professor at Nowhere University
            </Typography>
            <Typography className={classes.authorDescription}>
              Scholar Reputation: 15
            </Typography>
            <Typography className={classes.authorDescription}>
              Published papers: 100
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <PaperDashboard rows={rows}></PaperDashboard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}