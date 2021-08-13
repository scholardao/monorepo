import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import PaperDashboard from "./PaperDashboard";
import NavBar from "./NavBar";
import exampleprofile from "../../assets/exampleprofile.svg";
import { useContractReader } from "../../hooks";

const stages = ["Draft", "Preprint", "Published"];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
  image: {
    borderRadius: "50%",
    marginBottom: "20px",
  },
  authorDescription: {
    marginBottom: "10px",
  },
}));
const themeLight = createTheme({
  palette: {
    background: {
      default: "#F7F8FC",
    },
  },
});

function createData(id, title, authors, submitted, status) {
  return { id, title, authors, submitted, status };
}

export default function Test(props) {
  const classes = useStyles();
  const paperId = useContractReader(props.readContracts, "Paper", "paperId");
  // let [rows, setRows] = useState([]);
  // useEffect(async () => {
  //   console.log(paperId);
  //   let tempRows = [];
  //   for (let i = 0; i <= paperId; i++) {
  //     const paper = await props.readContracts["Paper"]["getPaper"](i);
  //     console.log(i);
  //     console.log(paper);
  //     tempRows.push(createData(paper["id"], paper["title"], paper["author"], stages[paper["stage"]]));
  //   }
  //   setRows(tempRows);
  // }, [paperId]);

  const rows = [
    createData("1", "Bitcoin Whitepaper", "Satoshi Nakomoto, Random name", "May 12 2021", "Drafted"),
    createData("2", "Bitcoin Whitepaper", "Satoshi Nakomoto, Random name", "May 12 2021", "Drafted"),
    createData("3", "Bitcoin Whitepaper", "Satoshi Nakomoto, Random name", "May 12 2021", "Drafted"),
    createData("4", "Bitcoin Whitepaper", "Satoshi Nakomoto, Random name", "May 12 2021", "Drafted"),
    createData("5", "Bitcoin Whitepaper", "Satoshi Nakomoto, Random name", "May 12 2021", "Drafted"),
  ];
  console.log(rows);
  return (
    <div style={{ backgroundColor: "#F7F8FC" }}>
      <Grid container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.root}>
          <Grid container direction="column">
            <Grid container item align="left" spacing="3">
              <Grid item>
                <img src={exampleprofile} className={classes.image} alt="example profile" />
              </Grid>
              <Grid item>
                <Typography variant="h4" className={classes.authorDescription}>
                  SATOSHI NAKOMOTO
                </Typography>
                <Typography className={classes.authorDescription}>Professor at Nowhere University</Typography>
                <Typography className={classes.authorDescription}>Citations: 15</Typography>
                <Typography className={classes.authorDescription}>Published papers: 100</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <PaperDashboard rows={rows}></PaperDashboard>
            </Grid>
          </Grid>{" "}
        </Grid>
      </Grid>
    </div>
  );
}
