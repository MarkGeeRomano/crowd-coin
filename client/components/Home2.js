import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import NewCampaign from './NewCampaign2';
import styles from '../styles/home.css';

const Home = ({ campaigns, factory, web3 }) => {
    const cards = campaigns.map((campaign => {
        return (
            <div key={campaign[7]} className={styles.card}>
                <div>Campaign Name:  <span>{campaign[5]}</span></div>
                <div>Address:  <span style={{ fontSize: '13px' }}>{campaign[7]}</span></div>
                <div>Funds Available to this Campaign(eth):
                     <span>{web3.utils.fromWei(campaign[1],'ether')}</span>
                </div>
                <Link to={'/campaigns/' + campaign[7]}><div>View Campaign</div></Link>
            </div>
        )
    }));

    return (
        <div id='body'>
            <div className={styles.container}>
                <div className={styles.campaignContainer}>
                    <h3>ACTIVE CAMPAIGNS</h3>
                    <div className={styles.cardsContainer}>
                        {cards}
                    </div>
                </div>
                <NewCampaign factory={factory} web3={web3} />
            </div>
        </div>
    );
};

export default Home;