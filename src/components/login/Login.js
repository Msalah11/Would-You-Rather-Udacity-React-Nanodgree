import {connect} from 'react-redux';
import React from "react";
import {clearAuthedUser, setAuthedUser} from "../../actions/authedUser";
import {Redirect} from "react-router-dom";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
// import {setAuthedUser, clearAuthedUser} from '../actions/authedUser';

class Login extends React.Component {
    state = {
        userID: null,
        authed: false,
    };

    handleSelectionChanged(e) {
        const userID = e.target.value;
        this.setState(function(previousState) {
            return {
                ...previousState,
                userID,
            };
        });
    };

    handleLogin(e) {
        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.userID));

        this.setState(function(previousState) {
            return {
                ...previousState,
                authed: true,
            };
        });
    };

    componentDidMount() {
        this.props.dispatch(clearAuthedUser())
    }

    render() {
        const { userID, authed } = this.state;
        const { history, users } = this.props;
        const selectedUser = userID ? userID : 0;
        const avatar = userID ? users[userID].avatarURL : 'https://www.fillmurray.com/640/360';

        if(authed) {
            const redirect = history.location.state;
            if (redirect != null) {
                return <Redirect to={redirect} push={true} />
            }
            return <Redirect to='/' />
        }
        return (
            <Container>
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Header className='text-center'>
                                <Card.Title>Select User</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={4}>
                                        <div className="avatarHolder">
                                            <Image src={avatar} roundedCircle />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={8}>
                                        <Form>
                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Select User</Form.Label>
                                                <Form.Control as="select" value={selectedUser}
                                                              onChange={(event) => this.handleSelectionChanged(event)}>
                                                    <option value={0} disabled>Click To Select</option>
                                                    {Object.keys(users).map(function(key) {
                                                        return (
                                                            <option value={users[key].id} key={key}>{users[key].id}</option>
                                                        );
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Button variant="outline-primary"
                                                    onClick={(event) => this.handleLogin(event)}>Login</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(Login);
