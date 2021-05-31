import React from 'react';
import ReactDom from 'react-dom';
import Popular from './components/Popular';
import Battle from './components/Battle'; 
import ThemeContext from './context/theme';
import Nav from './components/Nav';
import Results from './components/Results';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'


import './index.css';

function App(){
 
    const [theme,setTheme] = React.useState('light');

    const toggleTheme = ()=>(setTheme((theme) => theme === 'light' ? 'dark' : 'light'))

    return ( 
        <Router>
            <ThemeContext.Provider value={theme}>
                <div className={theme}>
                    <div className="container">
                        <Nav toggleTheme={toggleTheme}/>
                        
                        <Switch>
                            <Route exact path="/" component={Popular}/>
                            <Route exact path="/battle" component={Battle}/>
                            <Route path="/battle/results" component={Results}/>
                            <Route render={() => (<h1>404</h1>)}/>
                        </Switch>
                    </div>
                </div>
            </ThemeContext.Provider>
        </Router>
    );
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
    );
