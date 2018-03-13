import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';
import styles from '../styles/header.css'

const Header = () => {
  return (
    <div id='header' className={styles.container}>
      <div className={styles.flexContainer}>
        <Fade top duration={1000}>
          <Link to='/'>
            <div >
              <h1>Crowd<div className={styles.ether}></div>Coin</h1>
            </div>
          </Link>
        {/* </Fade> */}
        <div className={styles.submenuContainer}>
          {/* <Fade top duration={1250}> */}
            <Link to='/new-campaign'><div className={styles.submenuItem}>Create New Campaign 📮</div></Link>
            <Link to='/about'><div className={styles.submenuItem}> About 📖</div></Link>
            <a href='https://github.com/MarkGeeRomano/crowd-coin'>
              <div className={styles.submenuItemLast}>
                Github <div className={styles.github}></div>
              </div>
            </a>
        </div>
          </Fade>
      </div>
    </div>
  );
};

export default Header;

