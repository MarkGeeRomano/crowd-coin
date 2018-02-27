import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';

import campaignGetter from '../ethereum/Campaign';

import RequestRow from './RequestRow';

class Requests extends Component {
    state = {
        address: this.props.id,
        requests: [],
        requestCount: '',
        approvers: '',
        kampaign: null
    };

    async componentDidMount() {
        const kampaign = await campaignGetter(this.props.id);

        const approvers = await kampaign.methods.approversCount().call();
        const requests = [];
        const requestCount = await kampaign.methods.getRequestsCount().call();
        for(let i = 0; i < requestCount; i++) {
            const request = await kampaign.methods.requests(i).call();
            requests.push(request);
        };

        this.setState({ ...this.state, requests , requestCount, approvers, kampaign });
    };

    renderRows() {
        return this.state.requests.map((request, i) => {
            return <RequestRow
                key={request.description + i}
                id={i}
                request={request}
                approvers={this.state.approvers}
                address={this.props.id}
                web3={this.props.web3}
                kampaign={this.state.kampaign}
             />
        });
    };

    render() {
        const  { Header, Row, HeaderCell, Body } = Table;
        return (
            <div>
                <h3>This Campaign's Requests</h3>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                        <Body>
                            {this.renderRows()}
                        </Body>
                </Table>
                <Link to={`/campaigns/${this.props.id}/requests/new`}>
                    <Button primary>Create New Request</Button>
                </Link>
            </div>
        );
    };
};

export default Requests;