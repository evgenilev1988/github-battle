import React from 'react';
import PropTypes from 'prop-types';
import {battle} from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

function ProfileList({user}){

    return (
      <ul className='card-list'>
                <li>
                  <FaUser color='rgb(239, 115, 115)' size={22} />
                  {user.profile.name}
                </li>
                {user.profile.location && (
                  <li>
                    <Tooltip text="User's Location">
                      <FaCompass color='rgb(144, 115, 255)' size={22} />
                      {user.profile.location}
                    </Tooltip>
                  </li>
                )}
                {user.profile.company && (
                  <li>
                    <Tooltip text="User's Company">
                      <FaBriefcase color='#795548' size={22} />
                      {user.profile.company}
                    </Tooltip>
                  </li>
                )}
                <li>
                  <FaUsers color='rgb(129, 195, 245)' size={22} />
                  {user.profile.followers.toLocaleString()} followers
                </li>
                <li>
                  <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                  {user.profile.following.toLocaleString()} following
                </li>
              </ul>
      );
} 

ProfileList.propTypes = {
  user: PropTypes.object.isRequired
}

function PlayerCard({title,user}){
    return (
        <Card
            header={title}
            subHeader={`Score: ${user.score.toLocaleString()}`}
            avatar={user.profile.avatar_url}
            href={user.profile.html_url}
            name={user.profile.login}
        >
             <ProfileList user={user}/>
          </Card>
     
    );
}

PlayerCard.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}



const resultsReducer = (state,action) => {
  switch(action.type){
    case 'success':
      return {
        ...state,
        winner:action.players[0],
        looser:action.players[1],
        error:null,
        loading:false
      }
      case 'error':
        return {
          ...state,
          error:action.message,
          loading:false
        }
        default:
          throw new Error();
  }
}

const Resutls = (props) => {
const {location} = props;
const {playerOne, playerTwo} = queryString.parse(location.search);
const [state, dispatch] = React.useReducer(resultsReducer,{
  loading: true,
  error: null
})


React.useEffect(()=>{battle([playerOne, playerTwo]).then((players)=>{
  dispatch({type:'success',players});
  console.log('data',players)
}).catch((message)=>{
  dispatch({type:'error',message})
  this.setState({
      error:message,
      loading:false
  })
});
},[]);



if (state.loading === true) {
  return (<Loading/>)
}

if (state.error) {
  return (
    <p className='center-text error'>{error}</p>
  )
}


  return (
    <React.Fragment>
      <div className='grid space-around container-sm'>
          <PlayerCard title={state.looser.score === state.winner.score ? "Tie" : "Winner"} user={state.winner} />
          <PlayerCard title={state.looser.score === state.winner.score ? "Tie" : "Looser"} user={state.looser} />    
      </div>
      <Link className='btn dark-btn btn-space' to='/battle'>
        Reset
      </Link>
      </React.Fragment>
  )  
}


export default Resutls;