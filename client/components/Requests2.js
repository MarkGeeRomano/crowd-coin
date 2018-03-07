import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import campaignGetter from '../../ethereum/Campaign';
import styles from '../styles/requests.css'
import Modal from 'react-modal';
import RequestRow from './RequestRow2';
import RequestModal from './RequestModal';

class Requests extends Component {

    state = {
        modalIsOpen: false,
        campaign: {},
        requests: [],
        manager: false,
        approver: false
    };

    openModal() {
        this.setState({ modalIsOpen: true });
    };

    closeModal() {
        this.setState({ modalIsOpen: false });
    };

    async componentDidMount() {
        const { campaignGetter, id, web3 } = this.props

        const campaign = await campaignGetter(id);
        const accounts = await web3.eth.getAccounts();
        let requests = [];
        let manager;
        let approver;
        try {
            const requestsCount = await campaign.methods.requestsLength().call();
            let request;
            for (let i = 0; i < requestsCount; i++) {
                request = await campaign.methods.requests(i).call();
                requests.push(request);
            };
            manager = await campaign.methods.manager().call() == accounts[0];
            approver = await campaign.methods.approvers(accounts[0]).call();
        } catch (err) {
            console.log(err);
        };

        this.setState({
            ...this.state,
            requests,
            manager,
            approver,
            campaign
        });
    };

    makeRows() {
        const { requests, approver, manager } = this.state;

        return this.state.requests.map((request, i) =>
            < RequestRow
                key={i + request.description}
                id={i}
                request={{
                    description: request.description,
                    value: request.value,
                    recipient: request.recipient,
                    approvalCount: request.approvalCount,
                    complete: request.complete
                }}
                manager={manager}
                approver={approver}
                campaign={this.state.campaign}
            />
        )
    };


    render() {
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div>
                        <Link to={`/campaigns/${this.props.id}`}>Go back to campaign</Link>
                        <h3>This campaign's requests</h3>
                    </div>
                    <button onClick={this.openModal.bind(this)}>
                        Create New Campaign
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Recipient</th>
                            <th>Approval count</th>
                            <th>Approve</th>
                            <th>Finalize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.makeRows()}
                    </tbody>
                </table>
                <RequestModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.openModal.bind(this)}
                    campaignGetter={this.props.campaignGetter}
                    id={this.props.id}
                    web3={this.props.web3}
                />
            </div>
        );
    };
};

export default Requests;