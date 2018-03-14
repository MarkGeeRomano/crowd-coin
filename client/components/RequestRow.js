import React, { Component } from 'react';

import ApproveFinalizeBtn from './ApproveFinalizeBtn';

class RequestRow extends Component {

    render() {
        const {
            request: {
                description,
                value,
                recipient,
                approvalCount,
                complete,
                approved
            },
            manager,
            approver,
            campaign,
            id,
            web3,
            approversCount,
            getRequests
        } = this.props;

        return (
            <tr style={complete ? { backgroundColor: '#c9c9c9', color: '#a7a7a7' } : {}}>
                <td>{this.props.id}</td>
                <td>{description}</td>
                <td>{this.props.web3.utils.fromWei(value, 'ether')}<div className='ether-denom'></div></td>
                <td style={{ fontSize: '13px' }}>{createUrl(recipient, complete)}</td>
                <td>{approvalCount} / {approversCount}</td>
                <ApproveFinalizeBtn
                    manager={manager}
                    approver={approver}
                    campaign={campaign}
                    web3={web3}
                    complete={complete}
                    id={id}
                    approved={approved}
                    getRequests={getRequests}
                    approversCount={approversCount}
                    approvalCount={approvalCount}
                />
            </tr>
        )
    };
};

function createUrl(address, complete) {
    return <a style={complete ? { color: 'rgb(130, 161, 192)' } : {}} target="_blank" href={'https://rinkeby.etherscan.io/address/' + address}>{address}{complete ? null : '📫' }</a>;
};

export default RequestRow;