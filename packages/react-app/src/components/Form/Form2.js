import React, { useState, useEffect, Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, FormControl, Grid, TextField, Select, MenuItem, Container } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { lightGreen } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";

import { Typography } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({}));

class Form2 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.goNextPage();
  };

  onemore = e => {
    this.setState({ count: this.state.count + 1 });
  };
  constructor() {
    super();
    this.state = {
      count: 1,
      disabled: false,
    };
  }
  render() {
    const { values, handleChange } = this.props;

    return (
      <form className="else" noValidate autoComplete="off">
        <div className="formpt1">
          <div className="filler"></div>
          <Typography gutterBottom variant="h4" className="mainTitle">
            What paper are you working on right now?
          </Typography>
          <Typography variant="h6" className="mainTitle2">
            Add your current paper and we will help publish it
          </Typography>

          <div className="titleContainer4">
            <Typography className="Typography" variant="h6">
              Who worked on this paper with you?
            </Typography>
            {this.state.count >= 1 && (
              <TextField
                margin="dense"
                id="filled-basic"
                label="Author 1"
                variant="filled"
                value={values.authors1}
                className="textfield"
                onChange={handleChange("authors1")}
              />
            )}
            {this.state.count >= 2 && (
              <TextField
                margin="dense"
                id="filled-basic"
                label="Author 2"
                variant="filled"
                value={values.authors2}
                className="textfield"
                onChange={handleChange("authors2")}
              />
            )}
            {this.state.count >= 3 && (
              <TextField
                margin="dense"
                id="filled-basic"
                label="Author 3"
                variant="filled"
                value={values.authors3}
                className="textfield"
                onChange={handleChange("authors3")}
              />
            )}
            {this.state.count >= 4 && (
              <TextField
                margin="dense"
                id="filled-basic"
                label="Author 4"
                variant="filled"
                value={values.authors4}
                className="textfield"
                onChange={handleChange("authors4")}
              />
            )}
            {this.state.count >= 5 && (
              <TextField
                margin="dense"
                id="filled-basic"
                label="Author 5"
                variant="filled"
                value={values.authors5}
                className="textfield"
                onChange={handleChange("authors5")}
              />
            )}

            <div className="helperDiv4">Fill in the full name of the authors (maximum 5)</div>
            <AddIcon onClick={this.onemore} fontSize="large" className="addicon"></AddIcon>
          </div>

          <div className="titleContainer5">
            <Typography className="Typography" variant="h6">
              Specify the validator tip and addresses (ETH)
            </Typography>
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Validator tip"
              variant="filled"
              defaultValue={values.validatorTip}
              className="textfield"
              onChange={handleChange("validatorTip")}
            />
            {/* <TextField margin = "dense" id = "outlined-basic" label="Validator tip" variant="filled" value = {Subject} className = "textfield" onChange = {handleInputChangeSubject}  />
              <TextField margin = "dense" id = "outlined-basic" label="Validator tip" variant="filled" value = {Subject} className = "textfield" onChange = {handleInputChangeSubject}  /> */}

            <div className="helperDiv5">
              Please enter a number between 0 and 1<br></br>
              Default is 0.2
            </div>
          </div>
          <div className="titleContainer6">
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Validator addresses"
              variant="filled"
              defaultValue={values.validatorAddresses}
              className="textfield"
              onChange={handleChange("validatorTip")}
            />
          </div>

          <Button id="buttonsForm2" color="default" variant="contained" label="Submit" onClick={this.continue}>
            Continue
          </Button>
        </div>
      </form>
    );
  }
}

export default Form2;
