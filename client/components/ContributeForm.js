import React, { Component } from 'react';
import { Button, Form, Input, Message, } from 'semantic-ui-react';

class ContributeForm extends Component {
    state = {
        contribution: '',
        loading: false,
        errMsg: '',
        txConfirmed: false
    };

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            errMsg: '',
            txConfirmed: false,
            loading: true
        });

        const { kampaign, web3, getSummary } = this.props;
        const { contribution } = this.state;

        const accounts = await web3.eth.getAccounts();

        let errMsg;
        try {
            if (!contribution) { throw { message: "You haven't inputted a contribution" } };

            await kampaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(contribution, 'ether')
            });

            getSummary();
        } catch (err) {
            errMsg = err.message.length > 1000 ? 'Rejected Transaction' : err.message
        };

        this.setState({
            contribution: '',
            errMsg,
            loading: false,
            txConfirmed: errMsg ? false : true
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errMsg}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.contribution}
                        onChange={e => this.setState({ ...this.state, contribution: e.target.value })}
                    />
                </Form.Field>
                <Message error negative header="Oops!" content={this.state.errMsg} />
                {this.state.txConfirmed ? <Message positive header="Transaction complete!" content="Contribution succesfully made" /> : null}
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
        )
    };
};

export default ContributeForm;