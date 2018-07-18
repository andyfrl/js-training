import React from 'react';
import {MenuHeadingContainer} from './MenuHeading';

const Main = () => (
    <div className="main-container">
        <MenuHeadingContainer />

        <div className="main-2">
            <div id="main-caption">
                Let's add<br></br>some emlpoyees!
            </div>

            <div className="main-2-controls">
                <button className="upload">Upload Template</button>
                <button className="add">Add Employee</button>
            </div>
            Download Employee Template
        </div>
    </div>
);

export default Main;
