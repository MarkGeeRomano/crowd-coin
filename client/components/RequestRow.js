import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import ApproveFinalizeBtn from './ApproveFinalizeBtn';

class RequestRow extends Component {

    async onApprove() {
        const { kampaign, web3 } = this.props;
        this.setState({ ...this.state, loading: true });

        const accounts = await web3.eth.getAccounts();
        let error;
        try {
            await kampaign.methods.approveRequest(this.props.id)
                .send({ from: accounts[0] });
        } catch (e) {

        };
        this.setState({ ...state, loading: false });
    };

    async onFinalize() {
        const { kampaign, web3 } = this.props;
        this.setState({ ...state, loading: true });

        const accounts = web3.eth.getAccounts();
        let error;
        try {
            await kampaign.methods.finalizeRequest(this.props.id)
                .send({ from: accounts[0] });
        } catch (e) {

        };
        this.setState({ ...state, loading: false });
    };

    render() {
        const { Row, Cell } = Table;
        const {
            description,
            value,
            recipient,
            approvalCount,
        } = this.props.request;
        const {
            approvers,
            web3,
            id,
            updateRequestData,
            kampaign,
            request
        } = this.props;

        return (
            <Row>
                <Cell>{this.props.id}</Cell>
                <Cell>{description}</Cell>
                <Cell textAlign='center'>{this.props.web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell textAlign='center'>{recipient}</Cell>
                <Cell textAlign='center'>{approvalCount + '/' + this.props.approvers}</Cell>
                <ApproveFinalizeBtn
                    onApprove={this.onApprove.bind(this)}
                    updateRequestData={updateRequestData}
                    kampaign={kampaign}
                    web3={web3}
                    id={id}
                    request={request}
                />
            </Row>
        )
    };
};

export default RequestRow;