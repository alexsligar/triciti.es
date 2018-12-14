import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import NavbarRight from './NavbarRight';

export default function Navbar () {

    return (
        <Menu>
            <Menu.Item header>
                <Link to='/'>
                    TriCiti.es
                </Link>
            </Menu.Item>
            <NavbarRight />
        </Menu>
    )
}