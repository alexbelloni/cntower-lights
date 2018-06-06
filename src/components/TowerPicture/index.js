import React, { Component } from 'react';
import './TowerPicture.css';
import {getColourArray} from '../../colourManager';

class TowerPicture extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        let myClassName = "figure centered";
        if(this.props.status) {
            let array = getColourArray(this.props.status.colours.trim());
            myClassName = "figure centered".concat(' ', array[0]);
        }

        return (
        <figure className={myClassName}>
            <img src="tower.png" alt="CN Tower" />
        </figure>
        );
    }
}

export default TowerPicture;