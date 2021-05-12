import { useEffect, useState } from "react";
import { connectWallet, mintNFT } from "./utils/interact.js";
//import { connectWallet, mintNFT } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [isConnected, setConnectedStatus] = useState(false);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  // eslint-disable-next-line
  useEffect(async () => { //TODO: implement
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" }) //get metamask
        if (accounts.length) { //if connected is true
          setConnectedStatus(true);
          setWallet(accounts[0]);
        } else {
          setConnectedStatus(false);
          setStatus("Connect your Ethereum Wallet using the top right button")
        }
      } catch {
        setConnectedStatus(false);
        setStatus("Connect your Ethereum Wallet using the top right button!" + walletAddress);
      }
    }

  });

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setConnectedStatus(walletResponse.connectedStatus);
    setStatus(walletResponse.status);
    if (isConnected) {
      setWallet(walletAddress);
    }

  };

  const onMintPressed = async () => { //TODO: implement
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {isConnected ? (
          "👛 Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>👛 Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ The HIVE Test NFT Minter</h1>
      <p>
        Fill out below form and press "Mint NFT"
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
