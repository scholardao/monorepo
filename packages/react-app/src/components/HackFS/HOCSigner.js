import { useState, useEffect } from "react";
import { ethers } from "ethers";
export default function HOCSigner(Component) {
  return function wrap(props) {
    const [signer, setSigner] = useState();
    useEffect(() => {
      window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
    }, []);
    return <Component signer={signer} {...props}></Component>;
  };
}
