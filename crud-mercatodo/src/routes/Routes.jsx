import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from '../pages/login/Login';

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exat path="/" component={Login}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes
