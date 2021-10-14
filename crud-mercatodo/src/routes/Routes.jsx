import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import User from '../components/userview/User';
import Admin from '../pages/admin/Admin';
import Login from '../pages/login/Login';

const Routes = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/user" component={props => <User {...props}/>}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
