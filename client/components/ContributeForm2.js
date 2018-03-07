import React, { Component } from 'react';

import styles from '../styles/ContributeForm.css'
import campaignGetter from '../../ethereum/Campaign';

class ContributeForm extends Component {
    state = { contribution: '' };

    async onSubmit(e) {
        e.preventDefault();
        const { web3, campaign } = this.props;

        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.contribute().
                send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.contribution, 'ether')
                });
        } catch (err) {
            console.log(err);
        };

        this.setState({ ...this.state, contribution: '' });
    };

    onChange(e) {
        e.preventDefault();
        this.setState({ ...this.state, contribution: e.target.value });
    };

    render() {
        return (
            <div className={styles.container}>
                <h2>Contribute to this campaign</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label htmlFor='min'>{this.props.minimumContribution} wei to gain voting rights</label>
                    <input onChange={this.onChange.bind(this)} />
                    <br />
                    <button>Contribute</button>
                </form>
            </div>
        );
    };
};

export default ContributeForm;

