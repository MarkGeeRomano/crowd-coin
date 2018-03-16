import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import campaignGetter from '../../ethereum/Campaign';
import web3 from '../../ethereum/web3';
import isRinkeby from './isRinkeby';
import { Fade } from 'react-reveal';

import styles from '../styles/campaign.css';

import ContributeForm from './ContributeForm';

class Campaign extends Component {
  constructor() {
    super();

    this.state = {
      minContribution: '0',
      balance: '0',
      requestsCount: '0',
      approversCount: '0',
      manager: '',
      name: '',
      description: '',
      campaign: ''
    };
  };

  async componentDidMount() {
    await this.getCampaign();
  };

  async getCampaign() {
    const campaign = await campaignGetter(this.props.id);
    const campaignMeta = await campaign.methods.getSummary().call();

    this.setState({
      minContribution: campaignMeta[0],
      balance: campaignMeta[1],
      requestsCount: campaignMeta[2],
      approversCount: campaignMeta[3],
      manager: campaignMeta[4],
      name: campaignMeta[5],
      description: campaignMeta[6],
      campaign
    });
  };

  makeCards() {
    return this.makeContent().map((item, i) =>
      <Fade key={item.title}>
        <div className={styles.card} >
          <div className={styles.title}>{item.title.toUpperCase()}</div>
          <div
            style={item.isDescAdd ? { fontSize: '15px', color: '#18bdc3' } : null}
            className={styles.value}>
            {item.value}
          </div>
          <div className={styles.description}>{item.description}</div>
          {item.link}
        </div>
      </Fade>
    );
  };

  render() {
    return (
      <div className={styles.container}>
        <Link to='/'><button>Back To Campaigns</button></Link>
        <ContributeForm
          minContribution={this.state.minContribution}
          campaign={this.state.campaign}
          web3={this.props.web3}
          hasAddress={this.props.hasAddress}
          getCampaign={this.getCampaign.bind(this)}
        />
        <div className={styles.summaryContainer}>
          <h2>Campaign Summary</h2>
          <div className={styles.cardsContainer}>
            {this.makeCards()}
          </div>
        </div>
      </div>
    );
  };


  makeContent() {
    const {
      description,
      manager,
      balance,
      requestsCount,
      approversCount,
      minContribution
    } = this.state;

    return [
      {
        title: 'campaign description 📃',
        value: description,
        description: '',
        isDescAdd: true
      },
      {
        title: 'address of manager 👩‍⚖️',
        value: createUrl(manager),
        description: "The creator of this campaign. They're able to create and finalize requests for campaign",
        isDescAdd: true
      },
      {
        title: 'campaign balance 💰',
        value: Math.round(web3.utils.fromWei(balance, 'ether')) + ' (ETH)',
        description: 'The amount of ether this campaign has',
      },
      {
        title: 'number of requests 🗃',
        value: requestsCount,
        description: 'The number of open requests this campaign has',
        link:
          <Link to={`/campaigns/${this.props.id}/requests`}>
            <button>Go To Requests</button>
          </Link>,
      },
      {
        title: 'number of approvers ⚖️',
        value: approversCount,
        description: 'The number of donators with request voting rights',
      },
      {
        title: 'Min. contribution for vote 💸',
        value: <div>{this.props.web3.utils.fromWei(minContribution)}<div className='ether-denom-lrg'></div></div>,
        description: 'The amount needed to contribute to gain voting rights',
      }
    ]
  };
};

function createUrl(address) {
  return <a target="_blank" href={'https://rinkeby.etherscan.io/address/' + address}>{address}📫</a>;
};

export default isRinkeby(Campaign);