import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Fade, SpecialFade } from 'react-reveal';
import factory from '../../ethereum/factory';

import styles from '../styles/newCampaign.css'

class NewCampaign extends Component {
  state = {
    name: '',
    description: '',
    minimum: '',
    msg: '',
    error: false,
    loading: false
  };

  async onSubmit(e) {
    e.preventDefault();
    let {
      name,
      minimum,
      description,
      error,
      msg
    } = this.state;

    error = false;
    msg = '';

    this.setState({ ...this.state, loading: true, msg, error })
    try {
      const invalid = (validateDesc(description) || validateMin(minimum) || validateName(name));
      if (invalid) { throw invalid; };

      const accounts = await this.props.web3.eth.getAccounts();
      await factory.methods.createCampaign(
        this.props.web3.utils.toWei(minimum, 'ether'),
        name,
        description
      ).send({ from: accounts[0] });

      minimum = '';
      name = '';
      description = '';
      msg = 'Successfully created campaign!';
      error: false;
      this.props.getCampaigns();
    } catch (err) {
      console.log(`err`,err)
      error = true;
      msg = err.message.length > 500 ? 'Rejected transaction!' : err.message;
    };

    this.setState({
      ...this.state,
      loading: false,
      name,
      minimum,
      description,
      error,
      msg
    });
  };

  render() {
    return (
      <Fade duration={1500}>
        <div className={styles.container}>
          <div className={this.props.path === '/new-campaign' ? styles.blink : null}>
            <div>
              <h3>Create a Campaign 📮</h3>
              <form autoComplete='off' onSubmit={this.onSubmit.bind(this)}>
                <div className={styles.fieldContainer}>
                  <div className={styles.inputContainer}>
                    <div>
                      <label htmlFor='name'>Name of campaign</label>
                      <br />
                      <input
                        value={this.state.name}
                        className={styles.name}
                        id='name'
                        onChange={this.onChangeName.bind(this)}
                      />
                    </div>
                  </div>
                  <div className={styles.inputContainer}>
                    <div>
                      <label htmlFor='min-contribution'>Min. Contribution</label>
                      <div className='ether-denom'></div>
                      <br />
                      <input
                        value={this.state.minimum}
                        id='min-contribution'
                        onChange={this.onChangeContribution.bind(this)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor='description'>Description of campaign</label>
                  <textarea
                    value={this.state.description}
                    rows='4'
                    id='description'
                    onChange={this.onChangeDescription.bind(this)}
                  />
                </div>
                <button >{this.state.loading ? <div className={styles.loader}></div> : 'Create Campaign'}</button>
                {this.state.msg &&
                  <div className={this.state.error ? 'msgBox error' : 'msgBox success'}>
                    {this.state.msg}
                  </div>}
              </form>
            </div>
            {!this.props.hasAddress &&
              <SpecialFade duration={1500}>
                <div className='mask'>
                  <p>You need to either login to Metamask or <a target="_blank" href='https://metamask.io/'>install</a> it to create a campaign 🦊</p>
                </div>
              </SpecialFade>
            }
          </div>
        </div>
      </Fade>
    );
  };

  onChangeName(e) {
    e.preventDefault();
    this.setState({ ...this.state, name: e.target.value });
  };

  onChangeContribution(e) {
    e.preventDefault();
    this.setState({ ...this.state, minimum: e.target.value });
  };

  onChangeDescription(e) {
    e.preventDefault();
    this.setState({ ...this.state, description: e.target.value });
  };
};

function validateName(name) {
  switch (true) {
    case !name:
      return new Error("Name can't be blank");
    case name.length >= 30:
      return new Error('Name must be less than 30 characters');
  };
  return false;
};

function validateMin(min) {
  switch (true) {
    case !min:
      return new Error('Must have a minimum amount');
    case isNaN(min):
      return new Error('Not a valid minumum');
  };
  return false;
};

function validateDesc(description) {
  switch (true) {
    case !description.length:
      return new Error("Description can't be blank");
    case description.length >= 200:
      return new Error('Description must be less than 200 characters');
  };
  return false;
};

export default NewCampaign;