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
        transform: 'translate(-50%, -50%)'
    }
};
class RequestModal extends Component {

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                // className={styles.container}
                style={customStyles}
                contentLabel="Example Modal"
                appElement={document.body}
            >
                <div className={styles.container}>
                    <div>
                        <button
                            onClick={this.props.closeModal}
                            className={styles.closeButton}
                        >
                            x
                        </button>
                        <h2>Create Request</h2>
                    </div>
                    <form>
                        <label>Request description</label>
                        <br />
                        <textarea rows='4' />
                        <br />
                        <br />
                        <label>Request recipient (address)</label>
                        <br />
                        <input className={styles.recipient}/>
                        <br/>
                        <label>Request value (eth)</label>
                        <br />
                        <input />
                        <br/>
                        <button className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </Modal>
        );
    };
};

export default RequestModal;