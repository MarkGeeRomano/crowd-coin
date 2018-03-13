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
            <tr>
                <td>{this.props.id}</td>
                <td>{description}</td>
                <td>{this.props.web3.utils.fromWei(value,'ether')}<div className='ether-denom'></div></td>
                <td style={{ fontSize: '13px' }}>{recipient} 📬</td>
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
                />
            </tr>
        )
    };
};

export default RequestRow;