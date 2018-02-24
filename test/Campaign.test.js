const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory');
const compiledCampaign = require('../ethereum/build/Campaign');

let accounts;
let factory;
let campaign;
let campaignAddress;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('sets deployer to manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('has a min contribution that is followed', async () => {
        const min = await campaign.methods.minimumContribution().call();
        assert(+min == 100);

        let err;
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: '20 '
            });
            err = false;
        } catch (e) {
            err = true;
        }

        assert(err);
    });

    it('manger and only manager can make requests', async () => {
        await campaign.methods.createRequest(
            'this is a req',
            '1000',
            accounts[2]
        )
            .send({ from: accounts[0], gas: '1000000' });

        const request = await campaign.methods.requests(0).call();
        assert(request.description == 'this is a req');

        let err;
        try {
            await campaign.methods.createRequest(
                'this is ALSO a req',
                '1000',
                accounts[2]
            )
                .send({ from: accounts[1], gas: '1000000' });
            err = false;
        } catch (e) {
            err = true;
        }

        assert(err);
    });

    it('should be able to approve a request', async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '1000'
        });

        await campaign.methods
            .createRequest('A', '500', accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });


        assert((await campaign.methods.requests(0).call()).complete);
    })
});