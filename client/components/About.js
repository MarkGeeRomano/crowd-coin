import React from 'react';
import { Fade } from 'react-reveal';

import styles from '../styles/about.css';

const About = (props) => (
  <div className={styles.container}>
    <h1>Welcome to Crowd Coin 😻</h1>
    <Fade>
      <h3>Interacting with the DApp</h3>
      <div>
        <p>Thanks for visiting Crowd Coin! This is a DApp (Decentralized Application) that runs on the the Ethereum Rinkeby test network. To really interact with this app, you’ll need to have the Metamask
🦊 browser plugin enabled and switched to the Rinkeby network. To gain some “fake” Rinkeby ether to play with on this app, visit <a target="_blank" href='https://faucet.rinkeby.io/'>this page</a> and follow the instructions.</p>
        <p><i>Not sure what Metamask is? Watch this <a target="_blank" href="https://www.youtube.com/watch?v=2YeyTF5lalE&t=1s">short video.</a></i></p>
      </div>
    </Fade>
    <Fade>
      <div>
        <h3>Using the DApp</h3>
        <p>This Dapp runs on a smart contract that establishes a set of rules around a crowdfunding	 campaign. It was inspired by Stephen Grider's <a target="_blank" href='https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/'><i>Ethereum and Solidity: The Complete Developer’s Guide</i></a>, an amazing Udemy course I can’t recommend highly enough.
Anyone with a bit of Rinkeby ether can deploy a campaign. Once the campaign is deployed, it will be displayed along with the other campaigns on the front page. If you’d like to donate to someone's (or your own) campaign, click the campaign and check out the summary page. In the corner is a donation form. That donation will be added to the campaigns balance. If you donated a certain amount, YOU get a say in how that balance gets spent 💅.</p>

        <p>The person who created the contract, or the “manager”, can create requests to utilize the campaigns funds. These requests all have a recipient attached; this ensures that funds will absolutely be sent to that individual address upon resolution of the request. But - requests are only resolved when a  greater than 50% approval consensus is reach. Did you donate that certain amount 🤔? Then you, sir or madam, get  to participate in that process 🤑! Once that 50% + consensus is reached, the manager has the option to finalize the request, which will send the ether specified in the request to the address.</p>
      </div>
    </Fade>
    <Fade>
      <div>
        <h3>Other Stuff</h3>
        <p>
          I’m always refactoring and adding/removing functionality to the contract. When I do, I redeploy the factory contract, which in turn “wipes” the campaigns from the application. They’ll still be on the blockchain, just not this app. So don’t get too attached to any campaigns 😹.
            </p>
        <p>You can view the verified contract code here 👉 <a target="_blank" href='https://rinkeby.etherscan.io/address/0x22106c92DeA310A89b86304AC8fa60312362cc4d#code'>Etherscan</a></p>
        <p>You can checkout the repo for this app here 👉 <a target="_blank" href='https://github.com/MarkGeeRomano/crowd-coin'>Github</a></p>
        <p>Question? Comment? Wanna troll me ?  👉 markgromano31@gmail.com</p>
      </div>
    </Fade>
  </div>
);

export default About;