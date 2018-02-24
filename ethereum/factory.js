import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';
import ADDRESS from './ADDRESS';

export default new web3.eth.Contract(JSON.parse(CampaignFactory.interface), ADDRESS);