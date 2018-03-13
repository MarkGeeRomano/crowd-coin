import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isRinkeby from './isRinkeby';
import { Fade } from 'react-reveal';

import NewCampaign from './NewCampaign';
import styles from '../styles/home.css';

class Home extends Component {
    state = {
        campaigns: [],
    };

    async componentDidMount() {
        this.getCampaigns();
    };

    async getCampaigns() {
        const { factory, campaignGetter } = this.props;
        const addresses = await this.props.factory.methods.getDeployedCampaigns().call();

        const campaigns = [];
        for (let i = 0; i < addresses.length; i++) {
            const campaign = this.props.campaignGetter(addresses[i]);
            const campaignDetails = await campaign.methods.getSummary().call();
            campaignDetails['7'] = addresses[i]
            campaigns.push(campaignDetails);
        };

        this.setState({ campaigns });
    };

    makeCards() {
        const { web3 } = this.props;
        return this.state.campaigns.map(((campaign, index) => {
            let card = (
                <div key={campaign[7]} className={styles.card}>
                    <div>Campaign Name:  <span>{'  ' + campaign[5]}</span></div>
                    <div>Address:  <span style={{ fontSize: '13px' }}>{createUrl(campaign[7])}</span></div>
                    <div>Funds Available to Campaign:
                            <span>
                            {'  ' + web3.utils.fromWei(campaign[1], 'ether')}<span className='ether-denom'></span>
                        </span>
                    </div>
                    <Link to={'/campaigns/' + campaign[7]}><div>View Campaign 🔎</div></Link>
                </div>);

            return index < 2 ? <Fade duration={500} key={campaign[7]}>{card}</Fade> : card;
        }));
    };

    render() {
        const {
            factory,
            web3,
            getCampaigns,
            hasAddress,
            path
        } = this.props;

        return (
            <div id='body'>
                <div className={styles.container}>
                    <div className={styles.campaignContainer}>
                        <div>
                            <h2>ACTIVE CAMPAIGNS 📜</h2>
                            <div className={styles.cardsContainer}>
                                {this.makeCards()}
                            </div>
                        </div>
                    </div>
                    <NewCampaign {...{
                        factory,
                        web3,
                        getCampaigns,
                        hasAddress,
                        path,
                        getCampaigns: this.getCampaigns.bind(this)
                    }} />
                </div>
            </div>
        );
    };
};

function createUrl(address) {
    return <a target="_blank" href={'https://rinkeby.etherscan.io/address/' + address}>{address}📫</a>;
};

export default isRinkeby(Home);