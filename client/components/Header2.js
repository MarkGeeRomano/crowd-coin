import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/header.css'

const Header = () => {
    return (
        <Link to='/'>
            <div className={styles.container}>
                <h1>CrowdCoin</h1>
            </div>
        </Link>
    );
};

export default Header;

