import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

const Routing = () => {
    return(
        <Router>
            <Switch>
                <Route exact path = "/" component = {App}/>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<Routing />, document.getElementById('root'));

serviceWorker.unregister();
