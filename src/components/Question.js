import React from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/questions';
import {Button, ButtonGroup, Card, Col, Image, ProgressBar, Row, Toast} from "react-bootstrap";
import {Link} from "react-router-dom";

class Question extends React.Component {
    state = {
        showToast: false,
        toastText: "Woohoo, you're Successfully Answered the Quetion"
    }

    setToast(action) {
        this.setState({showToast: action});
    }

    selectOption(option) {
        const { answerQuestion, authedUser, item } = this.props;
        if(!this.isUserVoted(item)) {
            answerQuestion(authedUser, item.id, option);
        } else {
            this.setState({toastText: 'Sorry, You are already voted'})
        }
        this.setToast(true);
        const self = this;
        setTimeout(function(){
            self.setToast(false);
        }, 3000);
    }

    isUserVoted(item) {
        const { authedUser } = this.props;
        if (item) {
            const checkOptionOne = item.optionOne.votes.includes(authedUser);
            const checkOptionTwo = item.optionTwo.votes.includes(authedUser);

            if (checkOptionOne || checkOptionTwo) {
                return true;
            }
        }

        return false;
    }

    render() {
        const {users, item, authedUser} = this.props;
        const votesOptionOne = item.optionOne.votes.length;
        const votesOptionTwo = item.optionTwo.votes.length;
        const votesTotal = votesOptionOne + votesOptionTwo;
        const percentVotesOptionOne = (votesOptionOne / votesTotal).toFixed(2) * 100;
        const percentVotesOptionTwo = (votesOptionTwo / votesTotal).toFixed(2) * 100;
        return (
            <>
                <Link to={`/questions/${item.id}`} className='q-item--class'>
                    <Card style={{marginBottom: '20px'}}>
                        <Card.Header>
                            <Card.Title>{users[item.author].name} Askes:</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={12} md={4}>
                                    <div className="avatarHolder">
                                        <Image src={users[item.author].avatarURL} roundedCircle />
                                    </div>
                                </Col>
                                <Col xs={12} md={8}>
                                    <h3>Would You Rather</h3>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant={item.optionOne.votes.indexOf(authedUser) > -1 ? 'secondary' : 'outline-secondary'}
                                                onClick={event => this.selectOption('optionOne', event)}>
                                            {item.optionOne.text}
                                        </Button>
                                        <Button variant={item.optionTwo.votes.indexOf(authedUser) > -1 ? 'secondary' : 'outline-secondary'}
                                                onClick={event => this.selectOption('optionTwo', event)}>
                                            {item.optionTwo.text}
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <div className="item-footer">
                                <i>{item.optionOne.text}</i>
                                <ProgressBar animated now={percentVotesOptionOne} label={`${item.optionOne.votes.length} Votes`} />
                            </div>

                            <div className="item-footer">
                                <i>{item.optionTwo.text}</i>
                                <ProgressBar animated now={percentVotesOptionTwo} label={`${item.optionTwo.votes.length} Votes`} />
                            </div>
                        </Card.Footer>
                    </Card>
                </Link>
                <Toast
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: '-80%',
                    }}
                    onClose={() => this.setToast(true)} show={this.state.showToast} delay={3000} autohide>
                    <Toast.Body>{this.state.toastText}</Toast.Body>
                </Toast>
            </>
        );
    }
}


function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        users,
    };
}

export default connect(mapStateToProps, actions)(Question);
