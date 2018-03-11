import React, { Component, Fragment } from 'react';
import styles from '../styles/requests.css';

class ApproveFinalizeBtn extends Component {
    state = {
        approved: this.props.approved,
        finalized: this.props.complete,
        approvedLoading: false,
        finalizedLoading: false,
    };

    async onApprove() {
        if (!this.props.approver || this.props.approved) { return; };
        const { campaign, web3, id } = this.props;
        this.setState({ ...this.state, approvedLoading: true });

        let approved;
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(id).send({ from: accounts[0] });
            approved = true;
        } catch (err) {
            approved = false;
            console.log(err.msg);
        };
        await this.props.getRequests();
        this.setState({ ...this.state, approvedLoading: false, approved });
    };

    async onFinalize() {
        if (!this.props.manager || this.props.complete) { return; };
        const { campaign , web3 , id } = this.props;
        this.setState({ ...this.state, finalizedLoading: true });

        let finalized;
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
            finalized = true;
        } catch (err) {
            finalized = false;
            console.log(err.msg);
        };
        await this.props.getRequests();
        this.setState({ ...this.state, finalizedLoading: false, finalized });
    };

    render() {
        const {
            approver,
            manager,
            approved,
            finalized,
            approvedLoading,
            finalizedLoading
        } = this.props;

        return (
            <Fragment>
                <td className={styles.buttonStyle} onClick={this.onApprove.bind(this)}>
                    {(this.state.approvedLoading && <div className='loader loaderAppFin'></div>)
                        ||
                        (approver ? (this.state.approved ? 'Approved ✅' : 'Approve 🗳') : "Can't Approve ❌ ")}
                </td>
                <td className={styles.buttonStyle} onClick={this.onFinalize.bind(this)}>
                    {(this.state.finalizedLoading && <div className='loader loaderAppFin'></div>)
                        ||
                        (manager ? (this.state.finalized ? 'Finalized ✅' : 'Finalize ✍️ ') : "Can't Finalize ❌ ")}
                </td>
            </Fragment>
        )
    };
};

export default ApproveFinalizeBtn;