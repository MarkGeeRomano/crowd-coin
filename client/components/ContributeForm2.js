import React from 'react';

import styles from '../styles/ContributeForm.css'

const ContributeForm = ({ min = '10' }) => {
    return (
        <div className={styles.container}>
            <h2>Contribute to this campaign</h2>
            <div>{min} wei to gain voting rights</div>
            <input/>
        </div>
    );
};

export default ContributeForm;

