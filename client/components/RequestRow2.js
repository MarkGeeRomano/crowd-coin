import React, { Component } from 'react';

import ApproveFinalizeBtn from './ApproveFinalizeBtn';

class RequestRow extends Component {

    render() {
        const {
            description,
            value,
            recipient,
            approvalCount,
        } = this.props.request;

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{description}</td>
                <td>{value}</td>
                <td>{recipient}</td>
                <td>{approvalCount}</td>
                <td>
                    <div>
                        <button>Approve</button>
                    </div>
                </td>
                <td>
                    <div>
                        <button>Finalize</button>
                    </div>
                </td>
            </tr>
        )
    };
};

export default RequestRow;