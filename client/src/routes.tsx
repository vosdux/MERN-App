import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Links } from './modules/Links';
import { Create } from './modules/Create';
import { Detail } from './modules/Detail';
import { Auth } from './modules/Auth';

export const useRoutes = (isAuthenticated: boolean): JSX.Element => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <Create />
                </Route>
                <Route path="/detail/:id">
                    <Detail />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}
