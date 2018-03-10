import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import styles from '../styles/ContributeForm.css'
import campaignGetter from '../../ethereum/Campaign';

class ContributeForm extends Component {
    state = {
        contribution: '',
        height: 0,
        arrow: String.fromCharCode(9660)
    };

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

    toggle(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            height: this.state.height == 0 ? 'auto' : 0,
            arrow: this.state.arrow == String.fromCharCode(9660) ?
                String.fromCharCode(9650)
                :
                String.fromCharCode(9660)
        });
    };

    render() {
        return (
            <div className={styles.shell}>
                <div
                    className={styles.frameTop}
                    onClick={this.toggle.bind(this)}
                >
                    Donate to this Campaign
                </div>
                <AnimateHeight
                    className={styles.animatorContainer}
                    duration={500}
                    height={this.state.height}
                >
                    <div className={styles.container}>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <label htmlFor='min'>{this.props.minContribution} wei to gain voting rights</label>
                            <input onChange={this.onChange.bind(this)} />
                            <br />
                            <button>Contribute</button>
                        </form>
                    </div>
                </AnimateHeight>
                <div
                    className={styles.frameBottom}
                    onClick={this.toggle.bind(this)}
                >
                    {this.state.arrow}
                </div>
            </div>
        );
    };
};

export default ContributeForm;

