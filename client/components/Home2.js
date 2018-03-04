import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import NewCampaign from './NewCampaign2';
import styles from '../styles/home.css';

const Home = ({ campaigns }) => {
    const cards = campaigns.map((campaign => {
        return (
            <div key={campaign} className={styles.card}>
                <div>Name of Campaign: <span>This is a campaign name</span></div>
                <div>Address: <span>{campaign}</span></div>
                <div>Available funds(eth): <span>{Math.floor(Math.random() * 100)}</span></div>
                <Link to={'/campaigns/' + campaign}>View Campaign</Link>
            </div>
        )
    }));

    return (
        <div>
        <div id="hi" className={styles.container}>
            <div className={styles.campaignContainer}>
                <h3>Active Campaigns</h3>
                <div className={styles.cardsContainer}>
                    {cards}
                </div>
            </div>
            <div className={styles.inbetween}></div>
            <NewCampaign />
        </div>
        </div>
    );
};

export default Home;