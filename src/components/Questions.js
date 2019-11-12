import React from "react";
import { connect } from 'react-redux';
import Question from "./Question";
import {Col, Container, Row} from "react-bootstrap";
import Layout from "./layout/layout";

class Questions extends React.Component{
    render() {
        const { id, questions } = this.props;
        const question = questions[id];

        return (
            <Layout>
                <div style={{marginTop: 20}}>
                    <Container>
                        <Row>
                            <Col xs={12} md={{span: 6, offset: 3}}>
                                {question && <Question item={question} />}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps({ authedUser, questions }, props) {
    const { id } = props.match.params;
    return {
        id,
        questions,
    };
}

export default connect(mapStateToProps)(Questions);
