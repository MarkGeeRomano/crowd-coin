import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import campaignGetter from '../../ethereum/Campaign';
import styles from '../styles/requests.css'
import Modal from 'react-modal';
import RequestRow from './RequestRow2';
import RequestModal from './RequestModal';

class Requests extends Component {

    state = {
        modalIsOpen: true
    };

    openModal() {
        this.setState({ modalIsOpen: true });
    };

    closeModal() {
        this.setState({ modalIsOpen: false });
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
                        {mockData()}
                    </tbody>
                </table>
                <RequestModal
                    modalIsOpen={this.state.modalIsOpen}
                    closeModal={this.closeModal.bind(this)}
                    openModal={this.openModal.bind(this)}
                />
            </div>
        );
    };
};

function mockData() {
    return [1, 2, 3, 4].map((x, i) =>
        < RequestRow
            key={i}
            id={i}
            request={{
                description: 'This is for buying stuff from that dude',
                value: Math.floor(Math.random() * 10),
                recipient: '0xB0ADCA96e365B1BD48fC93673D4C6dc695f5f9FD',
                approvalCount: Math.floor(Math.random() * 10)
            }}
        />
    )
};

export default Requests;