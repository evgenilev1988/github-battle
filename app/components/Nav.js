import React from 'react';
import ThemeContext from '../context/theme';
import {NavLink} from 'react-router-dom';

const activeStyle = {
    color: 'rgb(187, 46, 31)'
  }

function Nav ({toggleTheme}){

    const theme = React.useContext(ThemeContext);
    return (
                <nav className='row space-between'>
                    <ul className='row nav'>
                        <li>
                            <NavLink activeStyle={activeStyle} 
                            className='nav-link' 
                            exact
                            to='/'>Popular</NavLink></li>
                        <li><NavLink 
                            activeStyle={activeStyle} 
                            className='nav-link' 
                            to='/battle'>Battle</NavLink></li>
                    </ul>
                    <button style={{
                        fontSize:30
                    }} className='btn-clear' onClick={toggleTheme}>
                        {theme === 'light' ? '🔦': '💡' }
                    </button>
                </nav>      
    )
}

export default Nav;