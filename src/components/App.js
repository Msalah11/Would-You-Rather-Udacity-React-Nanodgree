import Login from "./Login";
import { connect } from 'react-redux';
import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import { handleInitialData } from "../actions";
import ProtectedRoute from "../utilities/ProtectedRoute";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Questions from "./Questions";

function App(props) {
    const { authedUser } = props;

    useEffect(() => {
        props.dispatch( handleInitialData() );
    });

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute path='/' exact component={Dashboard} authedUser={authedUser} />
                <ProtectedRoute path='/questions/:id' exact component={Questions} authedUser={authedUser} />
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
