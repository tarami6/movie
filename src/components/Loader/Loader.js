import React from 'react'
import {Button} from 'react-bootstrap'
import './Loader.css'

export const Loader = (props) =>{
    return(
        <div className="MyClass01">
            <div id="loader-container">
                <p id="loadingText">Loading</p>

            </div>
            <Button onClick={props.reset} className="ResetBtn">Reset</Button>
        </div>
        )

}