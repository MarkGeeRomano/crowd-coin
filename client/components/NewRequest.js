import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

import campaignGetter from '../ethereum/Campaign';

class NewRequest extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        loading: false,
        errMsg: '',
        txConfirmed: false
    };

    async onSubmit(e) {
        const { description, value, recipient } = this.state;
        this.setState({...this.state, errMsg: '', loading: true });

        const kampaign = await campaignGetter(this.props.id);
        const accounts = await this.props.web3.eth.getAccounts();

        let errMsg;
        let stateObj;
        try {
            await kampaign.methods.createRequest(
                description,
                this.props.web3.utils.toWei(value, 'ether'),
                recipient
            )
                .send({ from: accounts[0] });

            stateObj = {
                description: '',
                value: '',
                recipient: '',
                loading: false,
                errMsg: '',
                txConfirmed: true
            };
        } catch (err) {
            errMsg = err.message.length > 1000 ? 'Rejected Transaction' : err.message;
            stateObj = {
                ...this.state,
                loading: false,
                errMsg
            };
        };

        this.setState(stateObj);
    };

    render() {
        return (
            <div>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errMsg}>
                    <Form.Field>
                        <label>Request description</label>
                        <Input
                            value={this.state.description}
                            onChange={e => this.setState({ ...this.state, description: e.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Request value</label>
                        <Input
                            label='ether'
                            labelPosition='right'
                            value={this.state.value}
                            onChange={e => this.setState({ ...this.state, value: e.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Request recipient</label>
                        <Input
                            label='address'
                            labelPosition='right'
                            value={this.state.recipient}
                            onChange={e => this.setState({ ...this.state, recipient: e.target.value })}
                        />
                    </Form.Field>
                    <Message error negative header='Oops!' content={this.state.errMsg} />
                    {this.state.txConfirmed ? <Message positive header='Transaction complete!' content='Succesfully made request' /> : null}
                    <Button primary loading={this.state.loading}>Submit request!</Button>
                </Form>
            </div>
        );
    };
};

export default NewRequest;