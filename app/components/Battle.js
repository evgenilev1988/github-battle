import React, { useState } from 'react';
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';
import ThemeContext from '../context/theme';
import {Link} from 'react-router-dom';

import Resutls from './Results';

function Instructions(){
    const theme = React.useContext(ThemeContext);
    return (
            <div className="instructions-container">
                <h1 className='center-text header-lg'>
                    Instructions
                </h1>
                <ol className='container-sm grid center-text battle-instructions'>
                    <li>
                        <h3 className='header-sm'>Enter two Github users</h3>
                        <FaUserFriends className={`bg-${theme}`} color='rgb(255,191, 116)' size={140}/>
                    </li>
                    <li>
                        <h3 className='header-sm'>Battle</h3>
                        <FaFighterJet className={`bg-${theme}`} color='#727272' size={140}/>
                    </li>
                    <li>
                        <h3 className='header-sm'>See the winners</h3>
                        <FaTrophy className={`bg-${theme}`} color='rgb(255, 215, 0)' size={140}/>
                    </li>
                </ol>
            </div>
    );
}

function PlayerInput(props){
    const {label,onSubmit} = props;
    const [username,setUserName] = React.useState('');
    const theme = React.useContext(ThemeContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username)
    }

    return (
            <form className='column player' onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor='username' className='player-label'>
                {label}
            </label>
            <div className='row player-inputs'>
                <input 
                    type='text' 
                    id='username' 
                    className={`input-${theme}`}
                    placeholder='github user' 
                    autoComplete="off"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                />
            </div>
            <button
                className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
                type='submit'
                disabled={!username}
            >
                Submit
            </button>
        </form>    
    );
}

PlayerInput.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    label:PropTypes.string.isRequired
}

const PlayerPreview = ({username,onReset, label}) =>{

    const theme = React.useContext(ThemeContext);

    return(
            <div className='column player'>
            <h3 className='player-label'>{label}</h3>
            <div className={`row bg-${theme}`}>
                <div className='player-info'>
                    <img className='avatar-small' src={`https://github.com/${username}.png?size=200`}
                    alt={`Avatar for ${username}`}/>
                    <a href={`https://github.com/${username}`}
                    className='link'>
                        {username}
                    </a>
                </div>
                <button className='btn-clear flex-center' onClick={onReset}>
                    <FaTimesCircle color='rgb(194,57,42)' size={26}/>
                </button>
            </div>
        </div>
        
    );
}

PlayerPreview.propTypes = {
    username:PropTypes.string.isRequired,
    onReset:PropTypes.func.isRequired,
    label:PropTypes.string.isRequired
}


const Battle = () => {
    const [playerOne, setPlayerOne] = React.useState(null);
    const [playerTwo, setPlayerTwo] = React.useState(null);

    const handleSubmit = (id, player) => (id === 'playerOne'
    ? setPlayerOne(player)
    : setPlayerTwo(player))

    const onReset = (id) => (id === 'playerOne'
    ? setPlayerOne(null)
    : setPlayerTwo(null))

    return (
        <React.Fragment>
            <Instructions/>
            <div className='players-container'>
                <h1 className='center-text header-lg'>Players</h1>
                <div className='row space-around'>
                    {playerOne === null ? 
                    (<PlayerInput 
                        label="Player one" 
                        onSubmit={(player) => handleSubmit('playerOne',player)}
                        />) : 
                    (<PlayerPreview 
                        username={playerOne} 
                        label='Player One' 
                        onReset={()=>onReset('playerOne')} 
                        />)
                        }
                    {playerTwo === null ? 
                    (<PlayerInput label="Player Two" onSubmit={(player) => handleSubmit('playerTwo',player)}/>) :
                    (<PlayerPreview 
                        username={playerTwo}
                        label='Player Two'
                        onReset={()=>onReset('playerTwo')}/>)
                    }
                </div>
                {
                    playerOne && playerTwo && (
                        <Link 
                            className="btn dark-btn btn-space"
                        to={{
                            pathname: '/battle/results',
                            search:`?playerOne=${playerOne}&playerTwo=${playerTwo}`
                        }}>Battle</Link>
                        
                    )
                }
            </div>
        </React.Fragment>
    );

}

export default Battle;