import React from 'react';
import { connect } from 'react-redux';
import {Alert, Card, Col, Container, Image, Row} from "react-bootstrap";
import Layout from "./layout/layout";

function Leaderboard(props) {
    const { users } = props;
    console.log('users', users)
    const userList = Object.keys(users).map((key) => users[key]);
    const sortedUserList = userList.sort((a, b) => {
        const sumA = Object.keys(a.answers).length + a.questions.length;
        const sumB = Object.keys(b.answers).length + b.questions.length;
        return sumB - sumA;
    })

    return (
        <Layout>
            <Container>
                <Row>
                    <Col xs={12} md={{span: 6, offset: 3}}>
                        {sortedUserList.map((user, index) => (
                            <Card style={{margin: '20px 0'}} key={index}>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} md={4}>
                                            <div className="avatarHolder">
                                                <Image src={user.avatarURL} roundedCircle />
                                            </div>
                                        </Col>
                                        <Col xs={12} md={8}>
                                            <h3>{user.name}</h3>
                                            <Alert variant='dark'>
                                                <strong>Created Questions:</strong> {user.questions.length}
                                            </Alert>
                                            <Alert variant='info'>
                                                <strong>Answered Questions:</strong> {Object.keys(user.answers).length}
                                            </Alert>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(Leaderboard)
