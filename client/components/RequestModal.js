import React, { Component } from 'react';
import Modal from 'react-modal';

import styles from '../styles/requestModal.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        paddingTop: '2px',
        paddingBottom: '15px'
    }
};

class RequestModal extends Component {

    state = {
        description: '',
        recipient: '',
        value: ''
    };

    descriptionOnChange(e) {
        e.preventDefault();
        this.setState({ ...this.state, description: e.target.value });
    };

    recipientOnChange(e) {
        e.preventDefault();
        this.setState({ ...this.state, recipient: e.target.value });
    };

    valueOnChange(e) {
        e.preventDefault();
        this.setState({ ...this.state, value: e.target.value });
    };

    async onSubmit(e) {
        e.preventDefault();
        const { id, campaignGetter, web3 } = this.props;
        const { description, value, recipient } = this.state;

        const campaign = await campaignGetter(id);
        const accounts = await web3.eth.getAccounts();
        try {
            campaign.methods.createRequest(description, value, recipient)
                .send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        };
    };

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                appElement={document.body}
            >
                <div
                    onClick={this.props.closeModal}
                    className={styles.closeButton}
                >
                    x
                </div>
                <div className={styles.container}>
                        
                        <h2>Create Request</h2>
                    
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <label>Request description</label>
                        <textarea onChange={this.descriptionOnChange.bind(this)} rows='4' />
                        <div>
                            <div>
                                <label>Request recipient (address)</label>
                                <input className={styles.recipient} onChange={this.recipientOnChange.bind(this)} />
                            </div>
                            <div>
                                <label>Request value (eth)</label>
                                <input onChange={this.valueOnChange.bind(this)} />
                            </div>
                        </div>
                        <button className={styles.submitButton} >Submit</button>
                    </form>
                </div>
            </Modal>
        );
    };
};

export default RequestModal;