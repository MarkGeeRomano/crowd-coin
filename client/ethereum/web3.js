import Web3 from 'web3';
import { INFURA_URL } from './constants';

const provider = window.web3 ? window.web3.currentProvider : new Web3.providers.HttpProvider(INFURA_URL);

export default new Web3(provider);