import React, { Component, Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, Grid, TextField, Select, MenuItem, Container } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

import { Typography } from "@material-ui/core";

export class Form1 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.goNextPage();
  };

  formSubmitHandler = e => {
    e.preventDefault();
  };

  constructor() {
    super();
    this.state = {
      disabled: false,
    };
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <form className="else" onSubmit={this.formSubmitHandler} noValidate autoComplete="off">
        <div className="formpt1">
          <div className="filler"></div>
          <Typography gutterBottom variant="h4" className="mainTitle">
            What paper are you working on right now?
          </Typography>
          <Typography variant="h6" className="mainTitle2">
            Add your current paper and we will help publish it
          </Typography>
          <div className="titleContainer1">
            <Typography className="Typography" variant="h6">
              What is your paper's title?
            </Typography>

            <TextField
              margin="dense"
              id="filled-basic"
              label="Title"
              variant="outlined"
              defaultValue={values.title}
              className="textfield"
              onChange={handleChange("title")}
            />
            <div className="helperDiv1">
              A short concise title is best
              <ArrowLeftIcon fontSize="large" color="primary" className="iconsArrow"></ArrowLeftIcon>
            </div>
          </div>

          <div className="titleContainer2">
            <Typography className="Typography" variant="h6">
              What is your paper's subject?
            </Typography>
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              defaultValue={values.subject}
              className="textfield"
              onChange={handleChange("subject")}
            />
            <div className="helperDiv2">
              Enter the general area of study (eg. Computer Science, Biology)
              <ArrowLeftIcon fontSize="large" color="primary" className="iconsArrow"></ArrowLeftIcon>
            </div>
          </div>
          <div className="titleContainer3">
            <Typography className="Typography" variant="h6">
              Specific field
            </Typography>
            <TextField
              multiline
              rows={4}
              margin="dense"
              id="outlined-basic"
              label="Sub-Subjects"
              variant="outlined"
              defaultValue={values.subSubjects}
              className="textfield"
              onChange={handleChange("subSubjects")}
            />
            <div className="helperDiv3">
              Enter the specific field of study if applicable (eg. Number theory)
              <ArrowLeftIcon fontSize="large" color="primary" className="iconsArrow"></ArrowLeftIcon>
            </div>
          </div>
        </div>
        <Button label="Continue" color="default" variant="contained" onClick={this.continue} id="buttonsForm1">
          Continue
        </Button>
      </form>
    );
  }
}

export default Form1;
