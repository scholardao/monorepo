import React,{useState,useEffect, Component} from 'react'
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
// import { File } from 'web3.storage';

import {makeStyles} from '@material-ui/core/styles';
import axios from'axios'
import { Button, FormControl,Grid,TextField,Select,MenuItem, Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import styles from './formstyles.css'
import {ethers} from 'ethers'
import { Typography } from '@material-ui/core';
import Form1 from './Form/Form1.js';
import Form2 from './Form/Form2.js';
import Form3 from './Form/Form3.js';



window.ethereum.enable()
  console.log("hi", window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  console.log("signer", signer)
  const daiAddress = "0x8BC364e2fdD97f1bC7072edeED55a8A816026325";

  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_tokenName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenSymbol",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address payable",
          "name": "author",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "citationsUsed",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "validatorTip",
          "type": "uint256"
        }
      ],
      "name": "PaperCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "reviewer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "commentCid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum DAO.ReviewerDecision",
          "name": "reviewerDecision",
          "type": "uint8"
        }
      ],
      "name": "ReviewAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum DAO.ValidatorDecision",
          "name": "vDes",
          "type": "uint8"
        }
      ],
      "name": "Validated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_validatorAddress",
          "type": "address"
        }
      ],
      "name": "ValidationRequestSent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_validator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        }
      ],
      "name": "ValidatorConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_validatorAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        }
      ],
      "name": "ValidatorResponseSent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_deadline",
          "type": "uint256"
        }
      ],
      "name": "acceptValidationRequest",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isScholar",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isValidator",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isVerifiedScholar",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "paperById",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "tokenURI",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "author",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "validator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "validatorTip",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "enum DAO.PublicationStage",
          "name": "stage",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "amountRaised",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address payable[]",
          "name": "_validatorAddresses",
          "type": "address[]"
        }
      ],
      "name": "requestValidation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_reviewer",
          "type": "address"
        },
        {
          "internalType": "enum DAO.ReviewerDecision",
          "name": "_decision",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "_commentsCid",
          "type": "string"
        }
      ],
      "name": "review",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "_validator",
          "type": "address"
        }
      ],
      "name": "selectValidator",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        }
      ],
      "name": "sellPaper",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "sponsorPaper",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_fields",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "_subFields",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_citationsUsed",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256",
          "name": "_validatorTip",
          "type": "uint256"
        },
        {
          "internalType": "address payable[]",
          "name": "_validatorAddresses",
          "type": "address[]"
        }
      ],
      "name": "submitDraft",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_fields",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "_subFields",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "_tweetUrl",
          "type": "string"
        }
      ],
      "name": "verifyScholarProfile",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_scholarAddress",
          "type": "address"
        },
        {
          "internalType": "string[]",
          "name": "_fields",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "_subFields",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "_tweetUrl",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_collateral",
          "type": "uint256"
        }
      ],
      "name": "verifyValidatorProfile",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    }
  ],

   daiContract = new ethers.Contract(daiAddress, abi, signer);
  const daiWithSigner = daiContract.connect(signer);
function Web3stuff(titleString,IPFSlink,subject,subSubjects,papersCited,validatorTip,validatorAddresses){
  console.log("daiWithSigner", daiWithSigner, "daiContract", daiContract);
  console.log("tc", provider.getTransactionCount("0xc18f8639f33a5d313eeefabfdec11e63ce5e8f69"))
  console.log("draftSubmitted", daiContract.submitDraft(
      titleString,
      IPFSlink,
      subject,
      subSubjects,
      papersCited,
      validatorTip,
      validatorAddresses
      
  ));
}
//get renewed ABI
//check data being passed



const useStyles = makeStyles((theme)=>({
  
      }))
    
    
  
    async function makeFileObjects(input){
     
      const buffer = Buffer.from(JSON.stringify(input));
    
      const files = [
        new File(['contents-of-file-1'], 'plain-utf8.txt'),
        new File([buffer], 'hello.json')
      ]
      return files
    }
    async function storeFiles(files) {
        const client = makeStorageClient()
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
      }
 
       

        function getAccessToken(){
            return(process.env.API_TOKEN)
        }
        function makeStorageClient(){
            return new Web3Storage({token : getAccessToken()})
        }
         makeStorageClient()
         console.log('storage client created 1')
      
       
function executeEthers(holdValues){
console.log(holdValues)
console.log('above is the main stuff!')

const titleString = holdValues.title
const IPFSlink = holdValues.IPFSlink
const subject = holdValues.subject
const subSubjects=holdValues.subSubjects
const papersCited = holdValues.papersCited
const validatorTip = 0
const validatorAddresses = []

Web3stuff(titleString,IPFSlink,subject,subSubjects,papersCited,validatorTip,validatorAddresses)
}
    
const holdValues = {
    title:'',
     authors:[''],
     IPFSlink:'',
     subject:[''],
     subSubjects:[''],
     papersCited:[1],
     validatorTip:1,
     validatorAddresses:['']
}
class Uploadform extends Component{
   
 state ={
     step:1,
     title:'',
     authors1:'',
     authors2:'',
     authors3:'',
     authors4:'',
     authors5:'',
     IPFSlink:'',
     subject:[''],
     subSubjects:[''],
     papersCited:[1],
     validatorTip:1,
     validatorAddresses:[''],
     uploadedPaper:[]

 }

  
handleFile = input =>{
    this.state.uploadedPaper = input
}

 goNextPage = ()=>{

    const {step} = this.state;
    this.setState({
        step:step+1
    })
}

handleChange = input =>e=>{
  const authorsArray = ['','']
    
    if(input == "authors"){
      console.log('doing author stuff')
      authorsArray.push(e.target.value)
      authorsArray.map((author)=>{
        this.setState({
          authors:author
        })
      })
      
    
    }
    else{
      this.setState({[input]:e.target.value})
    }
   
}
handleAuthorsChange = input=>e=>{
  this.setState({
    authors:input.push(e.target.value)
  })
}
 render(){

   
    const { step, title,authors1,authors2,authors3,authors4,authors5,IPFSlink,subject,subSubjects,papersCited,validatorTip,validatorAddresses,uploadedPaper } = this.state;
    const values = {title,authors1,authors2,authors3,authors4,authors5,subject,subSubjects,papersCited,validatorTip,validatorAddresses,uploadedPaper  };

    switch (step) {
      default:
        return <h1>User Forms not working. Enable Javascript!</h1>;
      case 1:
        return (
          <Form1
            goNextPage={this.goNextPage}
            handleChange={this.handleChange}
            values={values}
          />
         
        );
      case 2:
        return (
          <Form2
            goNextPage={this.goNextPage}
            handleAuthorsChange = {this.handleAuthorsChange}
            handleChange={this.handleChange}
            values={values}
          />
        );
     case 3:
         return(
          <Form3
          goNextPage = {this.goNextPage}
          handleChange = {this.handleChange}
          handleFile = {this.handleFile}
          values = {values}
        />
         )
     case 4:
      
      makeFileObjects(values.uploadedPaper).then((uploadedPaperObject)=>{
        storeFiles(uploadedPaperObject).then((cid)=>{
          this.state.IPFSlink = cid
          holdValues.title = this.state.title
          holdValues.authors[0] =this.state.author1 
          holdValues.authors[2]=this.state.authors3
          holdValues.authors[1] = this.state.author2
          holdValues.authors[3] =this.state.author4
          holdValues.authors[4]= this.state.author5
         const fullIPFSlink = `ipfs://${this.state.IPFSlink}`
          holdValues.IPFSlink = fullIPFSlink
          holdValues.subject=this.state.subject
          holdValues.subSubjects=this.state.subSubjects
          holdValues.papersCited=this.state.papersCited
          holdValues.validatorTip=this.state.validatorTip
          holdValues.validatorAddresses.push(this.state.validatorAddresses)
          
        }).then(executeEthers(holdValues))

      })
      return(
        <div>
          Finished!!

        </div>
      )
     
    }
  }
}
export default Uploadform

 