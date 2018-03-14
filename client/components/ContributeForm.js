import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import styles from '../styles/ContributeForm.css'
import campaignGetter from '../../ethereum/Campaign';

class ContributeForm extends Component {
    state = {
        contribution: '',
        height: 0,
        arrow: String.fromCharCode(9660),
        msg: '',
        error: false,
        loading: false
    };

    async onSubmit(e) {
        e.preventDefault();
        const { web3, campaign } = this.props;
        let { error, msg, contribution } = this.state;
        error = false;
        msg = '';

        this.setState({ ...this.state, loading: true, error, msg });
        try {
            const invalid = validatecontribution(contribution);
            if (invalid) { throw invalid };

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().
                send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.contribution, 'ether')
                });

            contribution = '';
            msg = 'Successfully contributed!'
            this.props.getCampaign();
        } catch (err) {
            error = true;
            msg = err.message.length > 500 ? 'Rejected transaction!' : err.message;
        };

        this.setState({
            ...this.state,
            contribution,
            msg,
            error,
            loading: false
        });
    };

    onChange(e) {
        e.preventDefault();
        this.setState({ ...this.state, contribution: e.target.value });
    };

    toggle(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            height: this.state.height == 0 ? '200px' : 0,
            arrow: this.state.arrow == String.fromCharCode(9660) ?
                String.fromCharCode(9650)
                :
                String.fromCharCode(9660)
        });
    };

    render() {
        const { web3, minContribution, hasAddress } = this.props;
        const {
            height,
            contribution,
            loading,
            msg,
            error,
            arrow
        } = this.state;

        return (
            <div className={styles.shell}>
                <div className={styles.frameTop} onClick={this.toggle.bind(this)}>
                    Donate to this Campaign
                </div>
                    {hasAddress ?
                        <div style={{ maxHeight: this.state.height}} className={styles.container}>
                            <form autoComplete='off' onSubmit={this.onSubmit.bind(this)}>
                                <label htmlFor='donate'>{web3.utils.fromWei(minContribution, 'ether')}<div className='ether-denom'></div>  to gain voting rights⚖️</label>
                                <input id='donate' value={contribution} onChange={this.onChange.bind(this)} />
                                <br />
                                <button >{loading ? <div className='loader loaderSm'></div> : 'Contribute'}</button>
                                {msg &&
                                    <div className={error ? 'msgBox error sm' : 'msgBox success sm'}>
                                        {msg}
                                    </div>}
                            </form>
                        </div>
                        :
                        <div>
                            <p>You need to either login to Metamask or <a target="_blank" href='https://metamask.io/'>install</a> it to contribute to a campaign 🦊</p>
                        </div>}
                <div
                    className={styles.frameBottom}
                    onClick={this.toggle.bind(this)}
                >
                    {arrow}
                </div>
            </div>
        );
    };
};

function validatecontribution(contribution) {
    switch (true) {
        case !contribution:
            return new Error('Must enter a contribution');
        case isNaN(contribution):
            return new Error('Not a valid contribution amount');
    };
    return false;
};

export default ContributeForm;

