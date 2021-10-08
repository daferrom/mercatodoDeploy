import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Admin from '../pages/admin/Admin';
import Login from '../pages/login/Login';

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/admin" component={Admin}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
