import React,{Component,Fragment} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import { Button, FormControl,Grid,TextField,Select,MenuItem, Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'


import { Typography } from '@material-ui/core';




 


  export class Form1 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.goNextPage();
      };

    formSubmitHandler = e =>{
        e.preventDefault()
        
    }

      constructor() {
        super();
        this.state = {
          disabled: false
        };
      }

      render(){
          const {values,handleChange} = this.props;
          return(
<form  className = "else" onSubmit ={this.formSubmitHandler} noValidate autoComplete="off">
        <div className = "formpt1" >
               <div className = "filler"></div>
                    <Typography gutterBottom variant="h4" className = "mainTitle">Submit a paper</Typography>
            
                    <Container className = "titleContainer1" >
                      
            <Typography className = "Typography" variant = "h6">
                What is your paper's title?
            </Typography>
              <TextField margin = "dense" id="filled-basic" label="Title" variant="filled" defaultValue = {values.title} className = "textfield" onChange = {handleChange("title")}  />
              <div className = "helperDiv">
        <Typography>A short concise title is best</Typography>
              </div>
             
              </Container>
        
        
              <Container className = "titleContainer2">
              <Typography className = "Typography" variant = "h6">
                What is your paper's subject?
            </Typography>
              <TextField margin = "dense" id = "outlined-basic" label="Subject" variant="filled" defaultValue = {values.subject} className = "textfield" onChange = {handleChange("subject")}  />
              <div className = "helperDiv">
        <Typography>Enter the general area of study</Typography>
              </div>
              <TextField margin = "dense" id = "outlined-basic" label="Sub-Subjects" variant="filled" defaultValue = {values.subSubjects} className = "textfield" onChange = {handleChange("subSubjects")}  />
              <div className = "helperDiv">
        <Typography>Enter the specific subject</Typography>
              </div>
              </Container>
              <Button
         
          label="Continue"
          onClick={this.continue}
        >
          Continue
        </Button>
                  
   
                
             </div>
            </form>     

          )
      }
    } 

export default Form1