import React from "react";
import { connect } from 'react-redux';

const Dashboard = (props) => {
    console.log(props);
    return (
        <>
            Dashboard Works Fine
        </>
    );
}

function mapStateToProps({ authedUser, questions, users }) {
    return {
        authedUser,
        questions,
        users,
    };
}

export default connect(mapStateToProps)(Dashboard)
