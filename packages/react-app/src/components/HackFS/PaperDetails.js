import { Grid, Typography, Paper, Button, Modal } from "@material-ui/core";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
// import { Web3Storage } from "web3.storage";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useContractReader, useContractLoader } from "../../hooks";
import ReviewForm from "./ReviewForm";
import HOCSigner from "./HOCSigner";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: "1",
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "50px",
  },
  description: {
    padding: "20px",
    marginBottom: "20px",
  },
  reviewTable: {
    marginTop: "20px",
    // marginLeft: "5px",
    // marginRight: "5px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  paper: {
    marginBottom: "20px",
    // borderRadius: "10px",
    height: "50px",
  },
  validate: {
    backgroundColor: "#F6BE00",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 0, 0.7)",
    },
  },
  publish: {
    backgroundColor: "green",
    marginRight: "8px",
    "&:hover": {
      backgroundColor: "rgba(0, 255, 0, 0.7)",
    },
  },
  reject: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.7)",
    },
  },
  inside: {
    height: "inherit",
    padding: "10px",
  },
}));

let stages = ["Draft", "Preprint", "Published"];
function arrayToString(array) {
  let res = "";
  for (let word of array) {
    if (!res) res += word;
    else res += ", " + word;
  }
  return res;
}

const reviewerDecisions = [
  { verdict: "Accept", color: "green" },
  { verdict: "MinorRevision", color: "#77945C" },
  { verdict: "MajorRevision", color: "#B25F4A" },
  { verdict: "Reject", color: "red" },
];

const reviews = [
  // { name: "Cuong 1", reviewerDecision: 1, commentsCid: "google.com" },
  // { name: "Cuong 2", reviewerDecision: 2, commentsCid: "google.com" },
  // { name: "Cuong 3", reviewerDecision: 1, commentsCid: "google.com" },
];

function Opinion(props) {
  return (
    <Typography
      component="div"
      style={{
        backgroundColor: props.item.color,
        borderRadius: "10px",
        color: "white",
        display: "grid",
        justifyContent: "center",
        width: "125px",
      }}
    >
      {props.item.verdict}
    </Typography>
  );
}
function PaperDetails(props) {
  const classes = useStyles();
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const id = params.id;
  const paperDetails = useContractReader(props.readContracts, "Paper", "getPaper", [id], 100000);
  const writeContracts = useContractLoader(props.signer, { chainId: 4 });
  const review = useContractReader(props.readContracts, "Paper", "reviews", [
    "0x196aee999118d036fC16AdAE432c1e7F39717183",
    params.id,
    0,
  ]);
  const scholarProfile = useContractReader(props.readContracts, "Paper", "scholarByAddress", [
    "0x196aee999118d036fC16AdAE432c1e7F39717183",
  ]);
  const history = useHistory();
  console.log("paperDetails " + paperDetails);

  const additionalReview =
    scholarProfile && review
      ? [
          {
            name: scholarProfile.name,
            reviewerDecision: review.reviewerDecision,
            commentsCid: "https://gateway.ipfs.io/ipfs/" + review.commentsCid,
          },
        ]
      : [];
  // const additionalReview = [];
  const displayReviews = [...reviews, ...additionalReview];

  // useEffect(() => {
  //   if (writeContracts)
  //     writeContracts["Paper"].verifyScholarProfile(
  //       "Cuong",
  //       ["Computer"],
  //       ["Computer"],
  //       "https://twitter.com/cuong_qnom",
  //     );
  // }, [writeContracts]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptValidation = () => {
    writeContracts["Paper"]
      .acceptValidationRequest(paperDetails.id, 1629400391)
      .then(() => history.push("/app/papers"));
  };

  const handleSubmitDecision = () => {
    writeContracts["Paper"].approvePaper(paperDetails.id).then(() => history.push("/app/papers"));
  };
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
            {validator && validator != "0x0000000000000000000000000000000000000000" ? (
              <Grid container>
                <Grid item xs={3}>
                  <Typography>Validator</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>{validator}</Typography>
                </Grid>
              </Grid>
            ) : (
              ""
            )}

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

          <div style={{ marginBottom: "16px" }}>
            {paperDetails && paperDetails.stage == 0 ? (
              <Button variant="contained" color="primary" onClick={handleAcceptValidation} className={classes.validate}>
                Accept Validation Request
              </Button>
            ) : paperDetails && paperDetails.stage == 1 ? (
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitDecision}
                      className={classes.publish}
                    >
                      Publish Paper
                    </Button>
                  </div>
                  <div>
                    <Button variant="contained" color="primary" className={classes.reject}>
                      Reject Paper
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {paperDetails && paperDetails.stage != 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography variant="h4" gutterBottom>
                    Reviews
                  </Typography>
                </div>
                <div>
                  {paperDetails && paperDetails.stage == 1 ? (
                    <Button variant="contained" onClick={handleOpen} color="primary" gutterBottom>
                      <AddIcon />
                      <span style={{ width: "5px" }}></span>
                      Add a Review
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Grid container item column className={classes.reviewTable}>
                {displayReviews.map(item => (
                  <Grid item className={classes.paper} xs={12}>
                    <Paper className={classes.inside}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
                        <div>
                          <Typography>{item.name}</Typography>
                        </div>
                        <div>
                          <Opinion item={reviewerDecisions[item.reviewerDecision]}></Opinion>
                        </div>
                        <div>
                          <Typography component="a" href={tokenURI} target="_blank">
                            View review
                          </Typography>
                        </div>
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <></>
          )}
          <Modal open={open} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <ReviewForm close={handleClose} id={id} />
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}

export default HOCSigner(PaperDetails);

// <Grid container item className={classes.paper}>
//                 <Grid item xs={3}>
//                   <Typography>Author Cuong1</Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography>{reviewerDecisions[item.reviewerDecision]}</Typography>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Typography component="a" href={tokenURI} target="_blank">
//                     View review
//                   </Typography>
//                 </Grid>
//               </Grid>
