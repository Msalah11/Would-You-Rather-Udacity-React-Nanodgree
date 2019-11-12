import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Layout from "./layout/layout";

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        redirect: false,
    }

    handleChange = function(event, optionIndex) {
        const text = event.target.value;

        this.setState(function(previousState) {
            return optionIndex === 1
                ? { ...previousState, 'optionOne': text }
                : { ...previousState, 'optionTwo': text };
        });
    }

    submitForm = function(event) {
        event.preventDefault();
        const { optionOne, optionTwo } = this.state;
        const { dispatch } = this.props;
        dispatch(handleAddQuestion(optionOne, optionTwo));
        this.setState(function(previousState) {
            return {
                ...previousState,
                redirect: true,
            };
        })
    }

    render() {
        const { optionOne, optionTwo, redirect } = this.state;

        if (redirect) {
            return <Redirect to='/' />
        }

        return (
            <Layout>
                <Container>
                    <Row>
                        <Col xs={12} md={{span: 6, offset: 3}}>
                            <Card style={{margin: '20px 0'}}>
                                <Card.Header>
                                    Add New Question
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(event) => this.submitForm(event)}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Option One</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Option One"
                                                value={optionOne}
                                                onChange={(event) => this.handleChange(event, 1)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Option Two</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Option One"
                                                value={optionTwo}
                                                onChange={(event) => this.handleChange(event, 2)}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        );
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users,
    };
}

export default connect(mapStateToProps)(NewQuestion)
