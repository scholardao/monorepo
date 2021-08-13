import React,{Component,Fragment} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import { Button, FormControl,Grid,TextField,Select,MenuItem, Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'


import { Typography } from '@material-ui/core';
import FileUploader from './fileUploader';




 


  export class Form3 extends Component {


handleUpload = e =>{
    
    console.log(`yaay ${e}`)
    

}
    handleChange = event => {
        const fileChanged = event.target.files[0];
       console.log(fileChanged)
       this.props.handleFile(fileChanged)

    };
    
      handleClick = event => {
        this.setState({hiddenFileInput:true})
      };
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
         hiddenFileInput: false,
          fileInput:'',
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
            
                    <Container className = "titleContainer5" >
                      
            <Typography className = "Typography" variant = "h6">
                Please submit a list of papers cited (copy and paste)
            </Typography>
              <TextField  id="outlined-multiline-static"
          label="Citations"
          multiline
          rows={10}
          defaultValue="Default Value"
          variant="outlined" defaultValue = {values.papersCited} className = "textfield" onChange = {handleChange("papersCited")}  />
              <div className = "helperDiv">
        <Typography>Please make sure they are each on separate lines</Typography>
              </div>
             
              </Container>
        
        
              <Container className = "titleContainer4">
              <Typography className = "Typography" variant = "h6">
                Upload your paper (.pdf)
            </Typography>
            
     <div>
     <input
     onChange={this.handleChange}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
      />
      {this.state.hiddenFileInput && <Typography>Uploaded</Typography>}
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" onClick = {this.handleUpload} component="span">
          Upload
        </Button>
      </label>
     {/* <input
      
      type="file"
      id = "file"
      accept="image/*"
      className = "uploadFile"
      value = {values.uploadedPaper}
      onChange={this.handleChange}
      style={{display: 'none'}} 
    />
    <Button onClick = {this.handleUpload}>Upload</Button> */}

     </div>
     
    
     
              
              {/* <div className = "helperDiv">
        <Typography>Upload the paper as a pdf file</Typography>
              </div> */}
              </Container>
              <Button
              variant = "contained"
              color="secondary"
         className = "button2"
          label="Submit"
          onClick={this.continue}
        >
          Submit
        </Button>
                  
  
                
             </div>
            </form>     

          )
      }
    } 

export default Form3