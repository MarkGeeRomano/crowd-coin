import React, { Component } from 'react';
import Modal from 'react-modal';
import { Fade } from 'react-reveal';
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
        value: '',
        msg: '',
        error: ''
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
        let {
            description,
            value,
            recipient,
            error,
            msg
        } = this.state;

        error = false;
        msg = '';

        this.setState({ ...this.state, loading: true, msg, error })
        try {
            const invalid = (validateDesc(description) || validateValue(value) || validateRecipient(recipient));
            if (invalid) { throw invalid; };

            const campaign = await campaignGetter(id);
            const accounts = await web3.eth.getAccounts();

            this.props.closeModal();
            this.props.addingRow();

            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({ from: accounts[0] });

            description = '';
            recipient = '';
            value = '';
        } catch (err) {
            error = true;
            msg = err.message.length > 500 ? 'Rejected transaction!' : err.message;
            this.props.openModal();
            this.props.turnOffSpinners();
        };

        this.props.doneAddingRow();
        this.setState({
            ...this.state,
            loading: false,
            recipient,
            value,
            description,
            error,
            msg
        });
    };

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                style={customStyles}
                appElement={document.body}
            >
            <Fade>
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
                                <label>Request value <div className='ether-denom'></div></label>
                                <input onChange={this.valueOnChange.bind(this)} />
                            </div>
                        </div>
                        <button className={styles.submitButton} >Submit</button>
                    </form>
                    {this.state.msg && <div className='msgBox error'> {this.state.msg} </div>}
                </div>
                </Fade>
            </Modal>
        );
    };
};

function validateDesc(description) {
    switch (true) {
        case !description:
            return new Error("Description can't be blank");
        case description.length >= 100:
            return new Error('description must be less than 100 characters');
    };
    return false;
};

function validateValue(value) {
    switch (true) {
        case !value:
            return new Error('Must have a value');
        case isNaN(value):
            return new Error('Not a valid value');
    };
    return false;
};

function validateRecipient(recipient) {
    switch (true) {
        case !recipient.length:
            return new Error("Recipient can't be blank");
        case recipient.length != 42:
        case recipient[1] != 'x':
        case recipient[0] != 0:
            return new Error("Recipient appears to be invalid");
        case recipient.length >= 200:
            return new Error('Description must be less than 200 characters');
    };
    return false;
};

export default RequestModal;