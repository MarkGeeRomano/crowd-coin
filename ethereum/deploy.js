const hdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./build/CampaignFactory');

const provider = new hdWalletProvider(
    'point pottery remind wave bulb crucial pretty waste bottom aunt glad enroll',
    //points to a node hosted by infura
    ' https://rinkeby.infura.io/dI1KXaB7EJkjyWstyu2a'
);

const web3 = new Web3(provider);

void async function deploy() {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({from: accounts[0], gas:'1000000'});

    console.log('address:', result.options.address)
}();