import React, { Component } from 'react';

import ApproveFinalizeBtn from './ApproveFinalizeBtn2';

class RequestRow extends Component {

    render() {
        const {
            request : {
                description,
                value,
                recipient,
                approvalCount,
                complete
            },
            manager,
            approver,
            campaign,
            id
        } = this.props;

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{description}</td>
                <td>{value}</td>
                <td>{recipient}</td>
                <td>{approvalCount}</td>
                <ApproveFinalizeBtn
                    manager={manager}
                    approver={approver}
                    campaign={campaign}
                    web3={web3}
                    complete={complete}
                    id={id}
                />
            </tr>
        )
    };
};

export default RequestRow;