import React, { Component, Fragment } from 'react';
import styles from '../styles/requests.css';

class ApproveFinalizeBtn extends Component {
  state = {
    approved: this.props.approved,
    finalized: this.props.complete,
    approvedLoading: false,
    finalizedLoading: false,
  };

  async onApprove() {
    if (!this.props.approver || this.props.approved) { return; };
    const { campaign, web3, id } = this.props;
    this.setState({ ...this.state, approvedLoading: true });

    let approved;
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.approveRequest(id).send({ from: accounts[0] });
      approved = true;
    } catch (err) {
      approved = false;
      console.log(err.msg);
    };
    await this.props.getRequests();
    this.setState({ ...this.state, approvedLoading: false, approved });
  };

  async onFinalize() {
    if (!this.props.manager || this.props.complete) { return; };
    const { campaign, web3, id } = this.props;
    this.setState({ ...this.state, finalizedLoading: true });

    let finalized;
    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
      finalized = true;
    } catch (err) {
      finalized = false;
      console.log(err.msg || err);
    };
    await this.props.getRequests();
    this.setState({ ...this.state, finalizedLoading: false, finalized });
  };

  render() {
    const {
      approver,
      manager,
      approved,
      complete,
      approvedLoading,
      finalizedLoading,
      approversCount,
      approvalCount
    } = this.props;

    const approvedContent = approveContent(approver, approved, complete);
    const finalizedContent = finalizeContent(approvalCount, approversCount, complete, manager);
    return (
      <Fragment>
        <td style={approvedContent.style} className={styles.buttonStyle} onClick={this.onApprove.bind(this)}>
          {(this.state.approvedLoading && <div className='loader loaderAppFin'></div>) || approvedContent.text}
        </td>
        <td style={finalizedContent.style} className={styles.buttonStyle} onClick={this.onFinalize.bind(this)}>
          {(this.state.finalizedLoading && <div className='loader loaderAppFin'></div>) || finalizedContent.text}
        </td>
      </Fragment>
    )
  };
};

function finalizeContent(approvalCount, approversCount, finalized, manager) {
  switch (true) {
    case finalized:
      return { text: 'Finalized', style: {} };
    case manager:
      return (approvalCount / approversCount) > .5 ?
        { text: 'Finalize ✍️', style: {} }
        :
        { text: "Not enough votes ❌", style: {} };
    default:
      return { text: "Can't Finalize ❌", style: {} }
  };
}

function approveContent(approver, approved, finalized) {
  switch (true) {
    case approved:
      return { text: finalized ? 'Approved' : 'Approved ✅', style: {} };
    case approver:
      return { text: finalized ? '-' : 'Approve 🗳', style: {} };
    default:
      return { text: finalized ? '-' : "Can't Approve ❌", style: {} };
  }
};

export default ApproveFinalizeBtn;