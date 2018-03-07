import React, { Component } from 'react';

class ApproveFinalizeBtn extends Component {
    state = {
        approved: this.props.approved,
        finalized: this.props.complete,
        approvedLoading: true,
        finalizedLoading: true,
    };

    async componentDidMount() {
    };

    async onApprove(e) {
        e.preventDefault();
        if (!this.props.approver || this.props.approved) return;
        const { campaign, web3, id } = this.props;

        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(id).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        };
        this.setState({ ...this.state, approved: true });
    };

    async onFinalize() {
    };

    render() {
        const {
            approver,
            manager,
            approved,
            finalized,
            approvedLoading,
            finalizedLoading
        } = this.props

        return [
            <td key={1}>
                <button onClick={this.onApprove.bind(this)}>
                    {approver ? 'Approve' : "Can't Approve"}
                </button>
            </td>,
            <td key={2}>
                <button onClick={this.onFinalize.bind(this)}>
                    {manager ? 'Finalize' : "Can't Finalize"}
                </button>
            </td>
        ];
    };
};

export default ApproveFinalizeBtn;