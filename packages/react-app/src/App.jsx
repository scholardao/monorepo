import WalletConnectProvider from "@walletconnect/web3-provider";
//import Torus from "@toruslabs/torus-embed"
import WalletLink from "walletlink";
import { Alert, Button, Col, Menu, Row } from "antd";
import "antd/dist/antd.css";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Web3Modal from "web3modal";
import "./App.css";

import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { Transactor } from "./helpers";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner,
} from "./hooks";
// import Hints from "./Hints";
import AuthorPage from "./components/HackFS/AuthorPage";
import MainPage from "./components/HackFS/MainPage";
import PaperDetails from "./components/HackFS/PaperDetails"
import UploadForm from "./components/HackFS/Form";
import Home from "./Home";


const paper_contract = require("./contracts/paper_contracts")

const { ethers } = require("ethers");

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.rinkeby; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;


// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(localProviderUrlFromEnv);


function App(props) {

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks




  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);
  const paper = useContractReader(readContracts, "Paper", "getPaper",["5"]);
  console.log(paper)


  return (
    <div>
      {/* ✏️ Edit the header and change the title to your project name */}
      {/* <Header /> */}

      <BrowserRouter>

      <Switch>
        <Route exact path="/app/author">
        <AuthorPage 
        readContracts={readContracts}
        />        
        </Route>
        <Route exact path="/app/papers">
        <MainPage readContracts={readContracts}/>
        </Route>
        <Route path="/app/papers/:id">
          <PaperDetails title="haha" readContracts={readContracts}></PaperDetails>
        </Route>
       <Route path = "/app/upload">
         <UploadForm readContracts={readContracts}/>
       </Route>
      <Route exact path = '/'>
        <Home></Home>
      </Route>
      </Switch>
      </BrowserRouter>
    </div>

      
  );
}

export default App;
