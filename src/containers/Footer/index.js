import React from 'react';
import { Container } from 'reactstrap';
import heartImg from '../../assets/heart.png';
import './index.css';

const Footer = ()=>{
    return(
        <Container className="footer">
            <span className='small by'>Please note: this is not an official CNTower website, just a tribute to this iconic building in Toronto, Canada.</span>
            <span className='small by'>Created <img className="heart" alt="" src={heartImg}/> by <a href="https://alexandrebelloni.com/" target="_blank" rel="noopener noreferrer">alexbelloni</a> | on Twitter <a href="https://twitter.com/xbelloni/" target="_blank" rel="noopener noreferrer">@xbelloni</a></span>
        </Container>  
    );
}

export default Footer;