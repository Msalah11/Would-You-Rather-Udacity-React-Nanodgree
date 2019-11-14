import Login from "./Login";
import { connect } from 'react-redux';
import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import { handleInitialData } from "../actions";
import ProtectedRoute from "../utilities/ProtectedRoute";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Questions from "./Questions";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import NotFound from "./NotFound";

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
                <ProtectedRoute path='/leaderboard' exact component={Leaderboard} authedUser={authedUser} />
                <ProtectedRoute path='/add' exact component={NewQuestion} authedUser={authedUser} />
                <Route path='/login' component={Login} />
                <Route component={NotFound} />
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
