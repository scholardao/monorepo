import React,{useState,useEffect} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import axios from'axios'
import { Button, FormControl,Grid,TextField,Select,MenuItem, Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';


import {Modal} from 'react-responsive-modal'
import NewMemberForm from './Uploadform';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme)=>({
    root:{
      // position:'absolute',
      // margin:'0',
      // top:'10%',
      // marginLeft:'35%',
    //    maxWidth:'1200px',
    //    maxHeight:'10%',
    //     border:'solid black'
       
       
      //  backgroundColor:'white',
      //  alignContent:'center',
       
    },

    


}));




export default function UploadPage(props){
    const classes = useStyles()
  
    return( 



<NewMemberForm></NewMemberForm>

   
    ) 
}