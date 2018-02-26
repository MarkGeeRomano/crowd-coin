import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const Header = ({ history }) => {
    const borderFix = { borderLeft: '1px solid rgba(34,36,38,.15)' };
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link to='/'>
                <Menu.Item>
                    Crowd Coin
                </Menu.Item>
            </Link>
            <Menu.Menu position='right'>
                <Link to='/'>
                    <Menu.Item style={borderFix}>Campaigns</Menu.Item>
                </Link>
                <Link to="/new-campaign" >
                    <Menu.Item>+</Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    )
};

export default withRouter(Header);

