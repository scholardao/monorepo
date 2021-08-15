import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import PaperDashboard from "./PaperDashboard";
import NavBar from "./NavBar";
import { useContractReader } from "../../hooks";

const stages = ["Draft", "Preprint", "Published"];
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
}));
function createData(id, title, authors, status) {
  return { id, title, authors, status };
}
export default function MainPage(props) {
  const classes = useStyles();
  const paperId = useContractReader(props.readContracts, "Paper", "paperId", 100000);
  let [rows, setRows] = useState([]);

  useEffect(async () => {
    console.log(paperId);
    let tempRows = [];
    for (let i = 1; i <= paperId; i++) {
      const paper = await props.readContracts["Paper"]["getPaper"](i);
      console.log(i);
      console.log(paper);
      // tempRows.push(
      //   createData(
      //     i + 1,
      //     "Bitcoin Whitepaper",
      //     //  paper["title"]
      //     paper["author"],
      //     "12 May 2020",
      //     stages[paper["stage"]],
      //   ),
      // );
      tempRows.push(createData(i, paper.title, paper.author, stages[paper.stage]));
    }
    setRows(tempRows);
  }, [paperId]);

  return (
    <div style={{ backgroundColor: "#F7F8FC" }}>
      <Grid container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.root}>
          <PaperDashboard rows={rows}></PaperDashboard>
        </Grid>
      </Grid>
    </div>
  );
}
