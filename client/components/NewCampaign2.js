import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import styles from '../styles/newCampaign.css'

class NewCampaign extends Component {
    state = {
        minimumContribution: '',
        errMsg: '',
        loading: false
    };

    render() {
        return (
            <div className={styles.container}>
                <h3>Create a Campaign</h3>
                <form>
                    <div>
                        <label htmlFor='description'>Description of campaign</label>
                        <textarea rows='4' id='description' />
                    </div>
                    <div>
                        <label htmlFor='min-contribution'>Minimum Contribution</label>
                        <br/>
                        <input id='min-contribution' />
                    </div>
                    <button >Create!</button>
                </form>
            </div>
        );
    };
};

export default NewCampaign;