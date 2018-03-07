import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

class ApproveFinalizeBtn extends Component {
    state = {
        isApprover: true,
        isManager: true,
        approved: false,
        finalized: false,
        approvedLoading: true,
        finalizedLoading: true,
    };

    async componentDidMount() {
        const { kampaign, web3, id, request } = this.props;
        const accounts = await web3.eth.getAccounts();
        const isApprover = await kampaign.methods.approvers(accounts[0]).call();
        const approved = await kampaign.methods.approved(id)
        const manager = await kampaign.methods.manager().call();
        this.setState({
            ...this.state,
            approvedLoading: false,
            finalizedLoading: false,
            approved,
            isApprover,
            finalized: request.complete,
            isManager: accounts[0] == manager
        });
    };

    async onApprove() {
        if (!this.state.isApprover || this.state.approved) return;
        const { kampaign, web3, id } = this.props;
        this.setState({ ...this.state, approvedLoading: true });

        const accounts = await web3.eth.getAccounts();
        let approved = false;
        try {
            await kampaign.methods.approve(id)
                .send({ from: accounts[0] });
            approved = await kampaign.methods.approved(id);
        } catch(e) {

        };

        this.setState({ ...this.state, approvedLoading: false, approved})
    };

    async onFinalize() {
        if (!this.state.isManager || this.state.finalized) return;
        const { kampaign, web3, id } = this.props;
        this.setState({ ...this.state, finalizedLoading: true });

        const accounts = await web3.eth.getAccounts();
        let finalized = false;
        try {
            await kampaign.methods.finalizeRequest(id)
                .send({ from: accounts[0] });
            finalized = true;
        } catch(e) {

        };

        this.setState({ ...this.state, finalized, finalizedLoading: false });
    };

    render() {
        const {
            isApprover,
            isManager,
            approved,
            finalized,
            approvedLoading,
            finalizedLoading
        } = this.state

        return [
            <Table.Cell key={1}>
                <Button
                    basic
                    loading={this.state.approvedLoading}
                    color={approvedLoading ? 'black' : isApprover ? (approved ? 'grey' : 'green') : 'red'}
                    onClick={this.onApprove.bind(this)}
                    style={{
                        horizontalAlign: 'middle',
                        display: 'block',
                        margin: 'auto'
                    }}
                >
                    {isApprover ? (approved ? 'Approved' : 'Approve') : "Can't Approve"}
                </Button>
            </Table.Cell>,

            <Table.Cell key={2}>
                <Button
                    basic
                    loading={this.state.finalizedLoading}
                    color={finalizedLoading ? 'black' : isManager ? (finalized ? 'grey' : 'green') : 'red'}
                    onClick={this.onFinalize.bind(this)}
                    style={{
                        horizontalAlign: 'middle',
                        display: 'block',
                        margin: 'auto'
                    }}
                >
                    {isManager ? (finalized ? 'Finalized' : 'Finalize') : "Can't Finalize"}
                </Button>

            </Table.Cell>
        ];

    };
};

export default ApproveFinalizeBtn;