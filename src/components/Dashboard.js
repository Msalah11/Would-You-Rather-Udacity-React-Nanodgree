import React from "react";
import Question from "./Question";
import { connect } from 'react-redux';
import Layout from "./layout/layout";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";

class Dashboard extends React.Component {
    render() {
        const { authedUser, questions } = this.props;
        const questionsList = Object.keys(questions).map((key) => questions[key]);
        let answeredQuestions = [];let unansweredQuestions = [];

        questionsList.filter(function(question) {
            let contains = (question.optionOne.votes.indexOf(authedUser) > -1 ||
            question.optionTwo.votes.indexOf(authedUser) > -1);
            contains ? answeredQuestions.push(question) : unansweredQuestions.push(question);
        });

        return (
            <Layout>
                <Container>
                    <Row>
                        <Col xs={12} md={{span: 6, offset: 3}}>
                            <Tabs fill variant="tabs" defaultActiveKey="Unansewred" id="uncontrolled-tab-example" className='justify-content-center tabs--class'>
                                <Tab eventKey="Ansewred" title="Ansewred">
                                    {answeredQuestions.map((item, index) => (
                                        <Question item={item} key={index}></Question>
                                    ))}
                                </Tab>
                                <Tab eventKey="Unansewred" title="Unansewred">
                                    {unansweredQuestions.map((item, index) => (
                                        <Question item={item} key={index}></Question>
                                    ))}
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        );
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    return {
        authedUser,
        questions,
        users,
    };
}

export default connect(mapStateToProps)(Dashboard)
