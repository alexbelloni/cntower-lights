import React from 'react';
import { Container } from 'reactstrap';
import heartImg from '../../assets/heart.png';
import './index.css';

const Footer = ()=>{
    return(
        <Container className="footer">
            <hr/>
            <span className='small by'>created <img className="heart" alt="" src={heartImg}/> by <a href="https://alexandrebelloni.com/" target="_blank" rel="noopener noreferrer">alexbelloni</a></span>
        </Container>  
    );
}

export default Footer;