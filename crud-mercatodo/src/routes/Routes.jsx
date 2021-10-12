import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import User from '../components/userview/User';
import Admin from '../pages/admin/Admin';
import Login from '../pages/login/Login';

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/user" component={User}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
