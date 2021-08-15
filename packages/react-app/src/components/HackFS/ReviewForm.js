import { InputLabel, MenuItem, Select, Grid, Button, Typography, Input } from "@material-ui/core";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import { useContractLoader } from "../../hooks";
import HOCSigner from "./HOCSigner";
import { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { PropertySafetyFilled } from "@ant-design/icons";

function ReviewForm(props) {
  const [decision, setDecision] = useState(0);
  const writeContracts = useContractLoader(props.signer, { chainId: 4 });
  const [files, setFiles] = useState();
  const history = useHistory();

  const handleSubmit = async () => {
    let client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYwNTE5NUFBOWU3MUQzMmUxNDRGODhEM2MyYjVlNTVENDg2YzRhNEIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg0MzEwNDA3NzksIm5hbWUiOiJTaGVldGFsQ29kZXMifQ.c-V4d1lQycfu6hyjRNyzSD50xZWoTtUF_qgTg1j2H_s",
    });
    const cid = await client.put(files);
    console.log("store files with cid: ", cid);
    const reviewerAddress = props.signer.getAddress();
    await writeContracts["Paper"].review(props.id, reviewerAddress, decision, cid);
    history.push("/app/papers");
  };
  return (
    <div
      style={{
        position: "absolute",
        width: 400,
        backgroundColor: "#FFF",
        border: "2px solid #000",
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        padding: "32px",
        top: "40%",
        left: "45%",
      }}
    >
      <Grid container direction="row-reverse">
        <Grid>
          <CloseIcon onClick={props.close} />
        </Grid>
      </Grid>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <Typography variant="h6" gutterBottom>
            Decision
          </Typography>
          <Select value={decision} onChange={e => setDecision(e.target.value)}>
            <MenuItem value={0}>Accept</MenuItem>
            <MenuItem value={1}>Minor Revision</MenuItem>
            <MenuItem value={2}>Major Revision</MenuItem>
            <MenuItem value={3}>Reject</MenuItem>
          </Select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Review File Upload
          </Typography>
          <Input
            type="file"
            onChange={e => {
              setFiles(e.target.files);
            }}
            disableUnderline
          ></Input>
        </div>
        <div>
          <Button onClick={handleSubmit} variant="contained" color="primary" label="Submit" disableElevation>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HOCSigner(ReviewForm);
