import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';

class About extends Component {
    render() {
        return (
            <Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            About page
                            </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

export default About; 