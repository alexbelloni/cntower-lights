import React, { Component } from 'react';
import './TowerPicture.css';

class TowerPicture extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        let myClassName = "figure centered";
        if(this.props.configs) {
            let colours = [];
            this.props.configs.forEach(element => {
                colours = colours.concat(element.colours);    
            });
            myClassName = "figure centered".concat(' ', colours.join(" "));
        }
        return (
        <figure className={myClassName}>
            <img src="tower.png" alt="CN Tower" />
        </figure>
        );
    }
}

export default TowerPicture;