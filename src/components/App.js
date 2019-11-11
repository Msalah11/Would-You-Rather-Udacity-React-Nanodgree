import Login from "./login/Login";
import { connect } from 'react-redux';
import React, {useEffect} from "react";
import Dashboard from "./dashboard/Dashboard";
import { handleInitialData } from "../actions";
import ProtectedRoute from "../utilities/ProtectedRoute";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App(props) {
    const { authedUser } = props;

    useEffect(() => {
        props.dispatch( handleInitialData() );
    });

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path='/' exact component={Dashboard} authedUser={authedUser} />
                <Route path='/login' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}
function mapStateToProps({ authedUser }) {
    return {
        authedUser: authedUser !== null,
    };
}

export default connect(mapStateToProps)(App);
