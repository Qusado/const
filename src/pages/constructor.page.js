import React, {useContext} from 'react'
import {Constructor} from "./Constructor";


export const ConstructorPage = () =>{
    return(
        <div className="container" style={{backgroundImage: './images/s3-bg-long-big.jpg'}}>
           <div className="row">
               <h1 className="text-light">
                   Канва вашего ТЗ
               </h1>
           </div>
            <div className="row" style={{height: "80vh"}}>
               <Constructor/>
               <div className="col-2 align-self-end">
                   <button type="button" className="download action-button shadow">
                       <i className="fas fa-file-download"></i> Скачать макет
                   </button>
                   <button type="button" className="download action-button shadow">
                       <i className="fas fa-file-download"></i> Скачать ТЗ
                   </button>
                   <button type="button" className="download action-button shadow">
                       <i className="fas fa-file-download"></i> Скачать канву
                   </button>
               </div>
           </div>
        </div>
    )
}
