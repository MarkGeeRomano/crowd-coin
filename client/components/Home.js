import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isRinkeby from './isRinkeby';
import { Fade } from 'react-reveal';

import NewCampaign from './NewCampaign';
import styles from '../styles/home.css';

class Home extends Component {
    state = {
        campaigns: [],
        rinkeby: true,
        hasAddress: true
    };

    async componentDidMount() {
        if (await web3.eth.net.getNetworkType() != 'rinkeby') {
            return this.setState({ rinkeby: false });
        }
        this.getCampaigns();
    };

    async getCampaigns() {
        const address = await web3.eth.getAccounts();
        const hasAddress = !!address[0];
        const addresses = await factory.methods.getDeployedCampaigns().call();
        const campaigns = [];
        for (let i = 0; i < addresses.length; i++) {
            const campaign = campaignGetter(addresses[i]);
            const campaignDetails = await campaign.methods.getSummary().call();
            campaignDetails['7'] = addresses[i]
            campaigns.push(campaignDetails);
        };

        this.setState({ ...this.state, campaigns, hasAddress });
    };

    makeCards() {
        const { web3, campaigns } = this.props;

        return campaigns.map(((campaign, index) => {
            let card = (
                <div key={campaign[7]} className={styles.card}>
                    <div>Campaign Name:  <span>{'  ' + campaign[5]}</span></div>
                    <div>Address:  <span style={{ fontSize: '13px' }}>{'  ' + campaign[7]} 📫</span></div>
                    <div>Funds Available to Campaign:
                            <span>
                            {'  ' + web3.utils.fromWei(campaign[1], 'ether')}<span className='ether-denom'></span>
                        </span>
                    </div>
                    <Link to={'/campaigns/' + campaign[7]}><div>View Campaign 🔎</div></Link>
                </div>);

            return index < 2 ? <Fade key={campaign[7]}>{card}</Fade> : card
        }));
    };

    render() {
        const { factory, web3, getCampaigns, hasAddress, path } = this.props;

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
                        path
                    }} />
                </div>
            </div>
        );
    };
};


// const Home = ({ campaigns, factory, web3, getCampaigns, hasAddress, match: { path } }) => {
//     const cards = campaigns.map(((campaign, index) => {
//         let card = (
//             <div key={campaign[7]} className={styles.card}>
//                 <div>Campaign Name:  <span>{'  ' + campaign[5]}</span></div>
//                 <div>Address:  <span style={{ fontSize: '13px' }}>{'  ' + campaign[7]} 📫</span></div>
//                 <div>Funds Available to Campaign:
//                         <span>
//                         {'  ' + web3.utils.fromWei(campaign[1], 'ether')}<span className='ether-denom'></span>
//                     </span>
//                 </div>
//                 <Link to={'/campaigns/' + campaign[7]}><div>View Campaign 🔎</div></Link>
//             </div>
//         );

//         return index < 2 ? <Fade>{card}</Fade> : card
//     }));

//     return (
//         <div id='body'>
//             <div className={styles.container}>
//                 <div className={styles.campaignContainer}>
//                     <div>
//                         <h2>ACTIVE CAMPAIGNS 📜</h2>
//                         <div className={styles.cardsContainer}>
//                             {cards}
//                         </div>
//                     </div>
//                 </div>
//                 <NewCampaign {...{
//                     factory,
//                     web3,
//                     getCampaigns,
//                     hasAddress,
//                     path
//                 }} />
//             </div>
//         </div>
//     );
// };

export default isRinkeby(Home);
