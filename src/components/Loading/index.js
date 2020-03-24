import React from 'react';
import loading from '../../assets/loading.gif';

const Loading = (props)=>{

    function changeIcon(){
        const link = document.querySelector("link[rel*='icon']");
        link.setAttribute("href", props.isLoading ? "favicon_loading.ico" : "favicon.ico")
    }

    changeIcon();
    return props.isLoading ? <img src={loading} alt='' /> : ""
}

export default Loading;