import React from 'react';
import { basePath } from '../config/properties';

const Home = () => {
    return (
        <div>
            <img style={{marginTop: '30px'}} height="350px" width="65%" className="ui image centered"  src={basePath + 'images/library.jpg'} />
            <h1 style={{textAlign: 'center'}}>Welcome to the library service!</h1>
        </div>
    );
}

export default Home;