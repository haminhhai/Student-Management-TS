import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getToken } from 'utils';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(getToken());
    if (!isLoggedIn) {
        return <Redirect to='/login'/>
    }

    return <Route {...props}/>;
}
