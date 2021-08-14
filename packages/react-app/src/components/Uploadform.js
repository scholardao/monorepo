import React, { useState, useEffect, Component } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
// /dist/bundle.esm.min.js";
// import { File } from 'web3.storage';

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Button, FormControl, Grid, TextField, Select, MenuItem, Container } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styles from "./formstyles.css";
import { ethers } from "ethers";
import { Typography } from "@material-ui/core";
import Form1 from "./Form/Form1.js";
import Form2 from "./Form/Form2.js";
import Form3 from "./Form/Form3.js";

import dataABI from "./abi.json";
import { useContractLoader } from "../hooks";

let web3done = false;
let contractinit = false;
// function web3stuffsss() {
//   window.ethereum.enable();
//   console.log("hi", window.ethereum);
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   console.log("signer", signer);
//   // const daiAddress = "0x8BC364e2fdD97f1bC7072edeED55a8A816026325";

//   // const daiContract = new ethers.Contract(daiAddress, dataABI, signer);
//   const contracts = useContractLoader(signer, { chainId: 4 });
//   const daiContract = contracts["Paper"];
//   // const daiWithSigner = daiContract.connect(signer);
//   // console.log("daiWithSigner", daiWithSigner, "daiContract", daiContract);
//   // console.log("tc", provider.getTransactionCount("0xc18f8639f33a5d313eeefabfdec11e63ce5e8f69"));

//   return daiContract;
// }

export default function HOCUploadform() {
  const [daiContract, setStateDaiContract] = useState();

  window.ethereum.enable();
  console.log("hi", window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log("signer", signer);
  // const daiAddress = "0x8BC364e2fdD97f1bC7072edeED55a8A816026325";

  // const daiContract = new ethers.Contract(daiAddress, dataABI, signer);
  const contracts = useContractLoader(signer, { chainId: 4 });
  useEffect(() => {
    if (contracts) setStateDaiContract(contracts["Paper"]);
  }, [contracts]);

  return <Uploadform daiContract={daiContract}></Uploadform>;
}
class Uploadform extends Component {
  Web3Storage1 = async input => {
    let newClient = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYwNTE5NUFBOWU3MUQzMmUxNDRGODhEM2MyYjVlNTVENDg2YzRhNEIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg0MzEwNDA3NzksIm5hbWUiOiJTaGVldGFsQ29kZXMifQ.c-V4d1lQycfu6hyjRNyzSD50xZWoTtUF_qgTg1j2H_s",
    });
    const buffer = Buffer.from(JSON.stringify(input));

    const files = [new File(["contents-of-file-1"], "plain-utf8.txt"), new File([buffer], "hello.json")];

    const client = newClient;
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  };

  componentDidUpdate() {
    const holdValues = {
      title: "",
      authors: [""],
      IPFSlink: "",
      subject: [""],
      subSubjects: [""],
      papersCited: [1],
      validatorTip: 1,
      validatorAddresses: [""],
    };

    if (this.state.step == 4 && this.state.isSubmitted == false) {
      console.log("i am here");
      this.Web3Storage1(this.state.uploadedPaper).then(cid => {
        holdValues.IPFSlink = cid;
        web3done = true;
        console.log("I DID THIS WTFF");
        holdValues.title = this.state.title;

        holdValues.authors[0] = this.state.author1;
        holdValues.authors[2] = this.state.authors3;
        holdValues.authors[1] = this.state.author2;
        holdValues.authors[3] = this.state.author4;
        holdValues.authors[4] = this.state.author;
        holdValues.subject = this.state.subject;
        holdValues.subSubjects = this.state.subSubjects;

        holdValues.validatorTip = this.state.validatorTip;
        holdValues.validatorAddresses = this.state.validatorAddresses;
        let subject = [];
        let subSubjects = [];
        subject.push(holdValues.subject);
        subSubjects.push(holdValues.subSubjects);

        const titleString = holdValues.title;
        const IPFSlink = holdValues.IPFSlink;

        const papersCited = holdValues.papersCited;
        const validatorTip = 0;
        const validatorAddresses = [];
        console.log(
          `Subject:${subject} + subSubjects:${subSubjects} + titleString:${titleString} + IPFSlink:${IPFSlink} + papersCited:${papersCited} + validatorTip:${validatorTip} + validatorAddresses:${validatorAddresses} `,
        );
        this.setState({ isSubmitted: true });
        this.props.daiContract
          .submitDraft(titleString, IPFSlink, subject, subSubjects, papersCited, validatorTip, validatorAddresses)
          .then(res => {
            console.log(res);
          });
      });
    }
  }

  state = {
    step: 1,
    title: "",
    authors1: "",
    authors2: "",
    authors3: "",
    authors4: "",
    authors5: "",
    IPFSlink: "",
    subject: [""],
    subSubjects: [""],
    papersCited: [1],
    validatorTip: 1,
    validatorAddresses: [""],
    uploadedPaper: [],
    isSubmitted: false,
    daiContract: ethers.Contract,
  };

  handleFile = input => {
    this.state.uploadedPaper = input;
  };
  submitSetter = () => {
    this.setState({ isSubmitted: true });
  };
  goNextPage = () => {
    const { step } = this.state;

    this.setState({
      step: step + 1,
    });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  handleAuthorsChange = input => e => {
    this.setState({
      authors: input.push(e.target.value),
    });
  };
  render() {
    const {
      isSubmitted,
      step,
      title,
      authors1,
      authors2,
      authors3,
      authors4,
      authors5,
      IPFSlink,
      subject,
      subSubjects,
      papersCited,
      validatorTip,
      validatorAddresses,
      uploadedPaper,
    } = this.state;
    const values = {
      title,
      IPFSlink,
      authors1,
      authors2,
      authors3,
      authors4,
      authors5,
      subject,
      subSubjects,
      papersCited,
      validatorTip,
      validatorAddresses,
      uploadedPaper,
    };

    switch (step) {
      default:
        return <h1>User Forms not working. Enable Javascript!</h1>;
      case 1:
        return <Form1 goNextPage={this.goNextPage} handleChange={this.handleChange} values={values} />;
      case 2:
        return (
          <Form2
            goNextPage={this.goNextPage}
            handleAuthorsChange={this.handleAuthorsChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Form3
            goNextPage={this.goNextPage}
            handleChange={this.handleChange}
            handleFile={this.handleFile}
            values={values}
          />
        );
      case 4:
        return <div>done</div>;
    }
  }
}

// export default Uploadform;
