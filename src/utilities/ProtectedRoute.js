import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...routeProps }) {
    const redirect = routeProps.location.pathname;

    return (
        <Route {...routeProps} render={function(props) {
            return (
                routeProps.authedUser
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: redirect
                    }} />
            )}
        } />
    );
}

export default withRouter(ProtectedRoute);
