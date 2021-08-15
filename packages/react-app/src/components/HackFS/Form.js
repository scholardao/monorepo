import { TextField, Paper, Grid, Typography, Input, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { useContractLoader, useContractReader } from "../../hooks";
import { ethers } from "ethers";
import HOCSigner from "./HOCSigner";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: "40px",
    marginRight: "40px",
    paddingTop: "40px",
    alignItems: "center",
  },
  rootOut: {
    flexGrow: 1,
    backgroundColor: "#F7F8FC",
  },
  paper: {
    marginLeft: "90px",
    marginRight: "90px",
    padding: "30px",
  },
  validator: {
    width: "inherit",
  },
}));

function Form(props) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState("");
  const [subFields, setSubFields] = useState("");
  const [validatorTip, setValidatorTip] = useState("");
  const [validatorAddress, setValidatorAddress] = useState("");
  const [files, setFiles] = useState();
  const writeContracts = useContractLoader(props.signer, { chainId: 4 });
  const paperId = useContractReader(props.readContracts, "Paper", "paperId");
  const history = useHistory();
  console.log(writeContracts);

  //   useEffect(() => {
  //     try {
  //       readContracts["Paper"].scholarByAddress("0x4deec328d7546873375C771C725c41d4Bb70A79E").then(res => {
  //         console.log("hello " + res);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, [readContracts]);
  const handleSubmit = async () => {
    let client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYwNTE5NUFBOWU3MUQzMmUxNDRGODhEM2MyYjVlNTVENDg2YzRhNEIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg0MzEwNDA3NzksIm5hbWUiOiJTaGVldGFsQ29kZXMifQ.c-V4d1lQycfu6hyjRNyzSD50xZWoTtUF_qgTg1j2H_s",
    });
    const cid = await client.put(files);
    console.log("store files with cid: ", cid);
    await writeContracts["Paper"].submitDraft(title, cid, [fields], [subFields], [], 0, [validatorAddress]);
    history.push("/app/papers");
    // await writeContracts["Paper"].verifyScholarProfile(
    //   "Scholar 2",
    //   ["Computer Science"],
    //   ["Computer Science"],
    //   "https://twitter.com/cuong_qnom",
    // );
    // await writeContracts["Paper"].verifyValidatorProfile(
    //   "Validator 2",
    //   "0xff71b146d0Ab307c49264D2BB368eDdf14aDB38B",
    //   ["Computer Science"],
    //   ["Computer Science"],
    //   "https://twitter.com/aeyakovenko",
    //   1,
    // );
  };
  //   const [author, setAuthor] = useState("");

  return (
    <div
    // style={{ backgroundColor: "#F7F8FC" }}
    >
      <Grid container>
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.root}>
          <Paper className={classes.paper}>
            <Typography align="left" variant="h3" gutterBottom>
              Upload a paper
            </Typography>
            <form>
              <div style={{ width: "400px" }}>
                <Typography variant="h6">Title</Typography>
                <TextField
                  placeholder="Title"
                  variant="outlined"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  margin="normal"
                  helperText="A short concise title is the best"
                  fullWidth
                ></TextField>
              </div>
              <div style={{ width: "400px" }}>
                <Typography variant="h6">Fields</Typography>
                <TextField
                  placeholder="Computer Science"
                  variant="outlined"
                  onChange={e => setFields(e.target.value)}
                  value={fields}
                  margin="normal"
                  helperText="Enter the general area of study (eg. Computer Science, Biology)"
                  fullWidth
                ></TextField>
              </div>
              <div style={{ width: "400px" }}>
                <Typography variant="h6">Specific Fields</Typography>
                <TextField
                  placeholder="Conpilers"
                  variant="outlined"
                  onChange={e => setSubFields(e.target.value)}
                  value={subFields}
                  margin="normal"
                  helperText="Enter the specific field of study if applicable (eg. Number theory)"
                  fullWidth
                ></TextField>
              </div>
              {/* <div style={{ width: "400px" }}>
                  
                <Typography variant="h6">Validator Tip</Typography>
                <TextField
                  placeholder="Compilers"
                  variant="outlined"
                  onChange={e => setSubjects(e.target.value)}
                  value={subjects}
                  margin="normal"
                  fullWidth
                ></TextField>
              </div> */}
              <Grid container spacing={2} className={classes.validator}>
                <Grid item xs={3}>
                  <Typography variant="h6">Validator Tip</Typography>
                  <TextField
                    placeholder="Compilers"
                    variant="outlined"
                    onChange={e => setValidatorTip(e.target.value)}
                    value={validatorTip}
                    helperText="Enter a number between 0 and 1"
                    margin="normal"
                    fullWidth
                  ></TextField>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">Validator Address</Typography>
                  <TextField
                    placeholder="0x000000"
                    variant="outlined"
                    onChange={e => setValidatorAddress(e.target.value)}
                    value={validatorAddress}
                    margin="normal"
                    fullWidth
                  ></TextField>
                </Grid>
              </Grid>
              {/* <div style={{ width: "400px" }}>
                <Typography variant="h6">Authors</Typography>
                <TextField
                  placeholder="Conpilers"
                  variant="outlined"
                  onChange={e => setAuthors(e.target.value)}
                  value={subjects}
                  margin="normal"
                  fullWidth
                ></TextField>
              </div> */}
              <div style={{ marginBottom: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  Paper submission
                </Typography>
                <Input
                  type="file"
                  onChange={e => {
                    setFiles(e.target.files);
                  }}
                  disableUnderline
                ></Input>
              </div>
              <Button onClick={handleSubmit} variant="contained" color="primary" label="Submit" disableElevation>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default HOCSigner(Form);
