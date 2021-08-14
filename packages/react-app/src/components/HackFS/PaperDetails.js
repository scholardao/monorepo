import { Grid, Typography, Paper } from "@material-ui/core";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
// import { Web3Storage } from "web3.storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContractReader } from "../../hooks";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
  description: {
    padding: "20px",
  },
}));

// const token = process.env.WEB3_STORAGE_API_TOKEN;
// const client = new Web3Storage({ token });
// async function retrieveFiles() {
//   const cid = "bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu";

//   const res = await client.gutterBottom(cid);
//   const files = await res.files();

//   for (const file of files) {
//     console.log(`${file.cid}: ${file.name} (${file.size} bytes)`);
//   }
// }
let stages = ["Draft", "Preprint", "Published"];
function arrayToString(array) {
  let res = "";
  for (let word of array) {
    if (!res) res += word;
    else res += ", " + word;
  }
  return res;
}
export default function PaperDetail(props) {
  const classes = useStyles();
  const params = useParams();
  const id = params.id;
  const paperDetails = useContractReader(props.readContracts, "Paper", "getPaper", [id], 100000);
  console.log(paperDetails);
  let title, author, tokenURI, fields, subFields, stage, validator;
  if (paperDetails) {
    title = paperDetails.title;
    author = paperDetails.author;
    tokenURI = "https://gateway.ipfs.io/ipfs/" + paperDetails.tokenURI;
    fields = arrayToString(paperDetails.fields);
    subFields = arrayToString(paperDetails.subFields);
    validator = paperDetails.validator;
    stage = stages[paperDetails.stage];
  }

  return (
    <div style={{ background: "#F7F8FC" }}>
      <Grid container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.root}>
          <Typography variant="h2" gutterBottom>
            {" "}
            {title}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Description
          </Typography>
          <Paper className={classes.description}>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Authors</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{author}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Validator</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{validator}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>IPFS Link</Typography>
              </Grid>
              <Grid item xs={9}>
                {/* <div style={{ textOverflow: "ellipsis", width: "25rem" }}> */}
                <Typography component="a" href={tokenURI} target="_blank">
                  {tokenURI}
                </Typography>
                {/* </div> */}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Fields</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{fields}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Sub Fields</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{subFields}</Typography>
              </Grid>
            </Grid>
            {/* <Grid container>
              <Grid item xs={3}>
                <Typography>Deadline</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>20 May 2021</Typography>
              </Grid>
            </Grid> */}
            <Grid container>
              <Grid item xs={3}>
                <Typography>Stage</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>{stage}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
