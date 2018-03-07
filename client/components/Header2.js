import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/header.css'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.flexContainer}>
                <Link to='/'>
                    <div >
                        <h1>CrowdCoin</h1>
                    </div>
                </Link>
                <div>
                    <div>Create New Campaign </div>
                    &nbsp | &nbsp
                    <div> About </div>
                    &nbsp | &nbsp
                    <div> &nbsp Github</div>
                </div>
            </div>
        </div>
    );
};

export default Header;

