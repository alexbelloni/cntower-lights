import React from 'react';
import './ExternalLink.css';
import ExternalLinkImg from '../../assets/external-link.png';

const ExternalLink = props => {
    return <a className="external-link" href={props.href} target='_blank' rel="noopener noreferrer"><img alt="" src={ExternalLinkImg} /></a>
}

export default ExternalLink;