import { Grid, Typography, Paper } from "@material-ui/core";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
// import { Web3Storage } from "web3.storage";
import { useEffect } from "react";
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

export default function PaperDetail(props) {
  const classes = useStyles();
  // useEffect(() => retrieveFiles(), []);
  return (
    <div style={{ background: "#F7F8FC" }}>
      <Grid container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.root}>
          <Typography variant="h2" gutterBottom>
            {" "}
            {props.title}
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
                <Typography>Alan Turing</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>IPFS Link</Typography>
              </Grid>
              <Grid item xs={9}>
                {/* <div style={{ textOverflow: "ellipsis", width: "25rem" }}> */}
                <Typography
                  component="a"
                  href={"https://gateway.ipfs.io/ipfs/QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj"}
                  target="_blank"
                >
                  https://gateway.ipfs.io/ipfs/QmRA3NWM82ZGynMbYzAgYTSXCVM14Wx1RZ8fKP42G6gjgj
                </Typography>
                {/* </div> */}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Fields</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>Cryptoeconomics, Humanities</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Sub Fields</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>Cryptoeconomics, Humanities</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Deadline</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>20 May 2021</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Stage</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>Draft</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
