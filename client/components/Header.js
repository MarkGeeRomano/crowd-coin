import React from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';

const fontStyle = { fontWeight: 'bold', fontSize: '20px' };
const Header = ({ history }) => {
    return (
        <Menu secondary>
            <Menu.Menu position='left'>
                <Link to='/'>
                    <Menu.Item style={fontStyle}>
                        Crowd Coin
                    </Menu.Item>
                </Link>
            </Menu.Menu>
            <Menu.Menu position='right'>
                <Link to="/new-campaign" >
                    <Menu.Item style={fontStyle}>
                        Add campaign +
                    </Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    )
};

export default withRouter(Header);

