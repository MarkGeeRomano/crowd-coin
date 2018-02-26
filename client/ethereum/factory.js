import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';
import { FACTORY_ADDRESS } from './constants';

export default new web3.eth.Contract(JSON.parse(CampaignFactory.interface), FACTORY_ADDRESS);