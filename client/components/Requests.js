import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import campaignGetter from '../../ethereum/Campaign';
import isRinkeby from './isRinkeby';
import { Fade } from 'react-reveal';

import styles from '../styles/requests.css'
import Modal from 'react-modal';
import RequestRow from './RequestRow';
import RequestModal from './RequestModal';

class Requests extends Component {

    state = {
        loadingReqs: true,
        modalIsOpen: false,
        campaign: {},
        requests: [],
        approversCount: 0,
        approved: false,
        finalized: false,
        manager: false,
        approver: false,
        addingRow: false
    };

    openModal() {
        this.setState({ ...this.state, modalIsOpen: true });
    };

    closeModal() {
        this.setState({ ...this.state, modalIsOpen: false });
    };

    makeFirstReq() {
        this.closeModal();
        this.addingRow();
    };

    addingRow() {
        this.setState({ ...this.state, addingRow: true })
    };

    turnOffSpinners() {
        this.setState({ ...this.state, addingRow: false });
    }

    async doneAddingRow() {
        const { campaign, requests } = this.state;
        const newReqNumber = this.state.requests.length;

        const newReq = await campaign.methods.requests(newReqNumber).call();
        this.setState({ ...this.state, requests: [...requests, newReq], addingRow: false });
    };

    async componentDidMount() {
        await this.getRequests();
    };

    async getRequests() {
        const { campaignGetter, id, web3 } = this.props

        const campaign = await campaignGetter(id);
        const accounts = await web3.eth.getAccounts();
        let requests = [];
        let manager;
        let approver;
        let approversCount;
        try {
            const requestsCount = await campaign.methods.requestsLength().call();
            let request;
            let approved;
            for (let i = 0; i < requestsCount; i++) {
                request = await campaign.methods.requests(i).call();
                approved = await campaign.methods.approved(i).call({ from: accounts[0] });
                request = { ...request, approved };
                requests.push(request);
            };
            manager = await campaign.methods.manager().call() == accounts[0];
            approver = await campaign.methods.approvers(accounts[0]).call();
            approversCount = await campaign.methods.approversCount().call();
        } catch (err) {
            console.log(err);
        };

        this.setState({
            ...this.state,
            requests,
            manager,
            approver,
            campaign,
            loadingReqs: false,
            approversCount
        });
    };

    makeRows() {
        const { requests, approver, manager, campaign } = this.state;

        return this.state.requests.map((request, i) =>
            < RequestRow
                key={i + request.description}
                id={i}
                request={request}
                manager={manager}
                approver={approver}
                campaign={campaign}
                web3={this.props.web3}
                approversCount={this.state.approversCount}
                getRequests={this.getRequests.bind(this)}
            />
        )
    };


    render() {
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Link to={`/campaigns/${this.props.id}`}>
                        <button>Go back to campaign</button>
                    </Link>
                    {this.state.manager && <button onClick={this.openModal.bind(this)}>Create New Request ✏️</button>}
                </div>
                <div className={styles.tableContainer}>
                    {this.state.requests.length || this.state.addingRow ?
                        <Fade>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Recipient</th>
                                        <th>Approvals</th>
                                        <th>Approve</th>
                                        <th>Finalize</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.makeRows()}
                                    {this.state.addingRow &&
                                        <Fade bottom>
                                            <tr>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                                <td><div className='loader loaderRow'></div></td>
                                            </tr>
                                        </Fade>}
                                </tbody>
                            </table>
                        </Fade>
                        : this.state.loadingReqs ?
                            <div style={{ marginTop: '20px' }}>loading requests....</div>
                            :
                            <div style={{ marginTop: '20px' }}>
                                No requests yet
                                {this.state.manager &&
                                    <span> ....but since you're the manager, you can
                                        <a onClick={this.openModal.bind(this)}> make one 😏</a>
                                    </span>}
                            </div>}
                </div>
                <RequestModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.openModal.bind(this)}
                    campaignGetter={this.props.campaignGetter}
                    id={this.props.id}
                    web3={this.props.web3}
                    addingRow={this.addingRow.bind(this)}
                    doneAddingRow={this.doneAddingRow.bind(this)}
                    turnOffSpinners={this.turnOffSpinners.bind(this)}
                />
            </div>
        );
    };
};

export default isRinkeby(Requests);