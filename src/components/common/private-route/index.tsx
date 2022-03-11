import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps {}

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('SMS_TOKEN'));
    if (!isLoggedIn) {
        return <Redirect to='/login'/>
    }

    return <Route {...props}/>;
}
