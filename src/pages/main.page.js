import React, {useContext} from 'react'
import {FirstMainBlock} from "../components/FirstMainBlock";
// import JsplumbTest from "../components/Flow_block";
import {Main_canva} from "../components/Main_canva";


export const MainPage = () =>{
    return(
        <div style={{backgroundImage: './images/s3-bg-long-big.jpg'}}>
            <FirstMainBlock/>
        </div>
    )
}
