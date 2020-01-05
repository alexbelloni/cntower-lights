import React from 'react';
import TowerDay from '../../components/TowerDay';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

export default class Days extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentDay: props.currentDay };
    }

    static getDerivedStateFromProps(props, state) {
        return { currentDay: props.currentDay };
    }

    render() {
        const days = this.props.days.map((d, index) => {
            return <Col key={index}><TowerDay currentDay={this.state.currentDay} day={d.day} onClick={this.props.onClick} key={'day' + d.day} /></Col>
        });

        return (
            <div>
                <p><a href='#' onClick={() => { this.props.onClick() }}>Today</a></p>
                <p>Special Days of {this.props.month}</p>
                <Container>
                    <Row>{days}</Row>
                </Container>
            </div>
        );
    }
}
