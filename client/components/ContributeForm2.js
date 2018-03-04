import React from 'react';

import styles from '../styles/ContributeForm.css'

const ContributeForm = ({ min = '10' }) => {
    return (
        <div className={styles.container}>
            <div>Contribute to this campaign</div>
            <div>{min} to gain voting rights</div>
            <input/>
        </div>
    );
};

export default ContributeForm;

