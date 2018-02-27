import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class RequestRow extends Component {

    state = {
        isApprover: true,
        loading: false
    };

    async componentDidMount() {
        const { kampaign, web3 } = this.props;
        const accounts = await web3.eth.getAccounts();
        const isApprover = await kampaign.methods.approvers(accounts[0]).call();
        console.log(isApprover)
        this.setState({ ...this.state, isApprover });
    };

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
        this.setState({ loading: false });
    };

    render() {
        const { Row, Cell } = Table;
        const {
            description,
            value,
            recipient,
            approvalCount,
        } = this.props.request;
        const { approvers, web3, id } = this.props;

        return (
            <Row>
                <Cell>{this.props.id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{this.props.web3.utils.fromWei(value, 'ether')}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>{approvalCount + '/' + this.props.approvers}</Cell>
                <Cell>
                    {this.state.isApprover 
                    ?
                    <Button
                        color='green'
                        basic
                        loading={this.state.loading}
                        onClick={this.onApprove.bind(this)}
                    >
                        Approve
                    </Button>
                    :
                    <Button color='red'>Not an approver</Button>}
                </Cell>
                <Cell></Cell>
            </Row>
        )
    };
};

export default RequestRow;