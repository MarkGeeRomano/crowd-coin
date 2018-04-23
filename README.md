## Crowd Coin

This codebase is what powers [Crowd-Coin](http://www.ccrowd-ccoin.herokuapp.com).

It's a React app that originally included Redux, but found as I developed it, there was little need to maintain a global state, largely thanks to MetaMask, which manages the users public/private key pairs, and works to offload authentication.

It runs on the Rinkeby network, and the contract makes use of a Factory. The address of the factory is `0x22106c92DeA310A89b86304AC8fa60312362cc4d` and I deployed via an infura node. I will likely refactor and redeploy the contract at some point in the future, so the address is bound to change.

I loved making this app, and would love to make another, so let me know if you'd like to collab.

✌️
