import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {

    render() {
        const { campaigns } = this.props;
        const cards = campaigns.map((campaign => {
            return {
                header: campaign,
                description: <Link to={'/campaigns/' + campaign}>View Campaign</Link>,
                fluid: true
            }
        }));

        return (
            <div>
                <h3 className={style.test}>Open Campaigns</h3>
                <Link to='/new-campaign'>
                    <Button
                        floated="right"
                        content="Create Campaign!"
                        icon="add circle"
                        primary
                    />
                </Link>
                <Card.Group items={cards} />
            </div>
        );
    };
};

export default Home;