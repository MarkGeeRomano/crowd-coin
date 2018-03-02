import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Container } from 'semantic-ui-react';

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
        this.updateRequestData();
    };

    async updateRequestData() {
        const kampaign = await campaignGetter(this.props.id);

        const approvers = await kampaign.methods.approversCount().call();
        const requests = [];
        const requestCount = await kampaign.methods.getRequestsCount().call();
        for (let i = 0; i < requestCount; i++) {
            const request = await kampaign.methods.requests(i).call();
            requests.push(request);
        };

        this.setState({ ...this.state, requests, requestCount, approvers, kampaign });

    }

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
                updateRequestData={this.updateRequestData.bind(this)}
            />
        });
    };

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        console.log(this.props.id)
        return (
            <div>
                <h3>This Campaign's Requests</h3>
                <Link to={`/campaigns/${this.props.id}`}>Go back to campaign</Link>
                <Link to={`/campaigns/${this.props.id}/requests/new`}>
                    <Button
                        style={{ marginBottom: '10px', float: 'right' }}
                        primary
                    >
                        Create New Request
                    </Button>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell textAlign='center'>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell textAlign='center'>Amount</HeaderCell>
                            <HeaderCell textAlign='center'>Recipient</HeaderCell>
                            <HeaderCell textAlign='center'>Approval Count</HeaderCell>
                            <HeaderCell textAlign='center'>Approve</HeaderCell>
                            <HeaderCell textAlign='center'>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>

            </div>
        );
    };
};

export default Requests;