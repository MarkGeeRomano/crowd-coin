import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import styles from '../styles/newCampaign.css'
import factory from '../../ethereum/factory';

class NewCampaign extends Component {
    state = {
        name: '',
        description: '',
        minimum: '',
        errMsg: ''
    };

    onChangeName(e) {
        e.preventDefault();
        this.setState({ ...this.state, name: e.target.value });
    };

    onChangeContribution(e) {
        e.preventDefault();
        this.setState({ ...this.state, minimum: e.target.value });
    };

    onChangeDescription(e) {
        e.preventDefault();
        this.setState({ ...this.state, description: e.target.value });
    };

    async onSubmit(e) {
        e.preventDefault();
        const { minimum, name, description } = this.state;

        const accounts = await web3.eth.getAccounts();
        try {
            await factory.methods.createCampaign(minimum, name, description)
                .send({ from: accounts[0] });
        } catch (e) {
            console.log(e.message)
        };
        
        this.setState({minimum: '', name: '', description: '' });
    };

    render() {
        return (
            <div className={styles.container}>
                <h3>Create a Campaign</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <label htmlFor='name'>Name of campaign</label>
                        <br />
                        <input
                            className={styles.name}
                            id='name'
                            onChange={this.onChangeName.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor='min-contribution'>Minimum Contribution For Vote (Wei)</label>
                        <br />
                        <input
                            className={styles.contribution}
                            id='min-contribution'
                            onChange={this.onChangeContribution.bind(this)}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Description of campaign</label>
                        <textarea
                            rows='4'
                            id='description'
                            onChange={this.onChangeDescription.bind(this)}
                        />
                    </div>
                    <button >Create!</button>
                </form>
            </div>
        );
    };
};

export default NewCampaign;