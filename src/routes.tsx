import React from "react";
import { Route, HashRouter, Switch } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top';
import Login from './pages/login';

export default (props: any) => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)
