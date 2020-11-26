import React from 'react';
import { Twitter } from 'react-sharingbuttons';
import './index.css';

const TwitterButton = (props) => {
    const URL = 'https://cntowerlights.netlify.app'

    return (
        <div className="SharingButtons">
            <span>Share on</span>
            <Twitter url={URL} shareText={props.text} />
        </div>
    )
}

export default TwitterButton;