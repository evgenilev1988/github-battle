import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api';
import {FaUser, FaStar,FaCodeBranch,FaExclamationTriangle } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguagesName({selected,onUpdateLange}){
    const languages = ['All','JavaScript','Ruby','Java','CSS','Python'];

    return(
        <ul className='flex-center'>
            {languages.map( (language) => 
                    (<li key={language}>
                        <button 
                            className='btn-clear nav-link'
                            style={language === selected ? {color:'red'} : null}
                            onClick={() => onUpdateLange(language)}>
                                {language}
                        </button>
                    </li>)
                )
            }
        </ul>
    )
}

LanguagesName.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLange:PropTypes.func.isRequired
}


function ReposGrid({repos}){
    return (
        <ul className="grid space around">
            {
                repos.map((repo,index)=>{
                    const {name,owner, html_url,stargazers_count,forks,open_issues} = repo;
                    const {login, avatar_url} = owner;

                    return (
                        <li key={html_url}>
                            <Card
                                header={`#${index + 1}`}
                                avatar={avatar_url}
                                href={html_url}
                                name={login}>
                                <ul className='card-list'>
                                    <li>
                                        <Tooltip text="GitHub User name">
                                            <FaUser color='rgb(255, 191, 116)' size={22}/>
                                            <a href={`https://github.com/${login}`}>
                                                {login}
                                            </a>
                                        </Tooltip>
                                       
                                    </li>
                                    <li>
                                        <FaStar color='rgb(255,215,0' size={22}/>
                                        {stargazers_count.toLocaleString()} stars
                                    </li>
                                    <li>
                                    <FaCodeBranch color='rgb(192,195,245' size={22}/>
                                        {forks}
                                    </li>
                                    <li>
                                    <FaExclamationTriangle color='rgb(241,138,146' size={22}/>
                                        {open_issues.toLocaleString()} open 
                                    </li>
                                </ul>
                            </Card>
                            
                            
                        </li>
                    );
                })
            }
        </ul>
    );
}

ReposGrid.propTypes = {
    repos:PropTypes.array.isRequired
}

class Popular extends React.Component{

    state = {
        selectedLanguage:'All',
        repos:{},
        error:null
    }
    

    componentDidMount(){
        this.selectedLanaguageChanged(this.state.selectedLanguage)
    }

    selectedLanaguageChanged = (lang) => {
        this.setState({
            selectedLanguage:lang,
            error:null
        });

        if(!this.state.repos[lang]){

            fetchPopularRepos(lang)
            .then((data)=>{
                this.setState(({repos}) => ({
                    repos:{
                        ...repos,
                        [lang]:data
                    }
                }))
            }).catch(() => {
                console.log('error fetching repos')
    
                this.setState({
                    error:"Error Fetching",
                    repos:null
                })
            })

       

        }

        
    }
 
    isLoading = () => {
        const {selectedLanguage, repos, error} = this.state;

        return !repos[selectedLanguage] && error === null

    }

    render(){
        const {selectedLanguage, repos, error} = this.state;

        return(
            <React.Fragment>
                <LanguagesName selected={selectedLanguage} onUpdateLange={this.selectedLanaguageChanged} />


                {this.isLoading() && <Loading />}
                {error && <p className='center-text error'>{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}

            </React.Fragment>
        )
    }
}

export default Popular;