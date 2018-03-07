import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import NewCampaign from './NewCampaign2';
import styles from '../styles/home.css';

const Home = ({ campaigns, factory  }) => {
    const cards = campaigns.map((campaign => {
        return (
            <div key={campaign[7]} className={styles.card}>
                <div>Name of Campaign: <span>{campaign[5]}</span></div>
                <div>Address: <span>{campaign[7]}</span></div>
                <div>Available funds(eth): <span>{campaign[1]}</span></div>
                <Link to={'/campaigns/' + campaign[7]}>View Campaign</Link>
            </div>
        )
    }));

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.campaignContainer}>
                    <h3>Active Campaigns</h3>
                    <div className={styles.cardsContainer}>
                        {cards}
                    </div>
                </div>
                <div className={styles.inbetween}></div>
                <NewCampaign factory={factory} web3={web3} />
            </div>
        </div>
    );
};

export default Home;