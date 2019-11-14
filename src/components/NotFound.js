import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "./layout/layout";
import {Button, Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

class NotFound extends Component {
    render() {
        return (
            <Layout>
                <Container>
                    <div style={{marginTop: 20}}>
                        <Card className='text-center'>
                            <Card.Body>
                                <h1>Page you are looking for is not found</h1>
                                <Link to='/home'>
                                    <Button variant='secondary'>Goto Home</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            </Layout>
        );
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(NotFound)
