import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Input, Message } from 'semantic-ui-react';

class NewCampaign extends Component {
    state = {
        minimumContribution: '',
        errMsg: '',
        loading: false,
        campaignTx: null
    };

    async onSubmit(e) {
        e.preventDefault();
        this.setState({ ...this.state, loading: true })

        const { minimumContribution } = this.state;
        const { factory, web3 } = this.props;

        const accounts = await web3.eth.getAccounts();
        let errMsg;
        let campaigns;
        try {
            if (!minimumContribution) { throw { message: "You must set a minimum! If you want a contribution of 0, be explicit." } }
            await factory.methods.createCampaign(minimumContribution).send({ from: accounts[0] });
            campaigns = await factory.methods.getDeployedCampaigns().call();
            this.setState({ ...this.state, errMsg: '' })
        } catch (err) {
            errMsg = err.message.length > 1000 ? 'Rejected Transaction' : err.message
        };
        this.setState({
            ...this.state,
            campaignTx: campaigns ? campaigns[campaigns.length - 1] : null,
            loading: false,
            errMsg
        });
    };

    render() {
        return (
            !this.state.campaignTx ?
                (<div>
                    <h3>Create a Campaign</h3>
                    <Form onSubmit={this.onSubmit.bind(this)} error={!!this.state.errMsg}>
                        <Form.Field>
                            <label>Minimum Contribution</label>
                            <Input
                                label="wei"
                                labelPosition="right"
                                value={this.state.minimumContribution}
                                size="small"
                                onChange={e => this.setState({ minimumContribution: e.target.value })}
                            />
                        </Form.Field>
                        <Message error negative header="Oops!" content={this.state.errMsg} />
                        <Button primary loading={this.state.loading}>Create!</Button>
                    </Form>
                </div>) : <Redirect to={`/campaigns/${this.state.campaignTx}`} />
        );
    };
};

export default NewCampaign;