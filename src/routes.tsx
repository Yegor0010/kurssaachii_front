import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

export default (props: any) => (
    <BrowserRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/' component={Dashboard} />
                <Redirect to="/not-found" />
            </Switch>
        </ScrollToTop>
    </BrowserRouter>
)
