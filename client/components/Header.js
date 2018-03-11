import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/header.css'

const Header = () => {
    return (
        <div id='header' className={styles.container}>
            <div className={styles.flexContainer}>
                <Link to='/'>
                    <div >
                        <h1>Crowd<div className={styles.ether}></div>Coin</h1>
                    </div>
                </Link>
                <div className={styles.submenuContainer}>
                    <Link to='/'><div className={styles.submenuItem}>Create New Campaign 📮</div></Link>
                    <Link to='/'><div className={styles.submenuItem}> About 📖</div></Link>
                    <a href='https://github.com/MarkGeeRomano/crowd-coin'><div className={styles.submenuItemLast}>
                         Github <div className={styles.github}></div>
                    </div></a>
                </div>
            </div>
        </div>
    );
};

export default Header;

