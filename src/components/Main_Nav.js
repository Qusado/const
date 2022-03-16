import React from 'react'
import {Link} from "react-router-dom";


export const Main_Nav = () => {
    return (
    <div className="">
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid px-4">
                <Link className="navbar-brand" to="/"><img  src="./images/цвет1.png" alt="" style={{height:"1vw", verticalAlign: "middle"}}/></Link>
                <div className="collapse navbar-collapse" id="navbarsExample02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="/dataBase">БАЗА ЗНАНИЙ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-item nav-link" to="/constructor">КОНСТРУКТОР</Link>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-item nav-link" to="/flow">flow</Link>*/}
                        {/*</li>*/}
                        <li>
                            <input className="form-control me-2 mx-4 col-3" type="search" placeholder="Search" aria-label="Search"/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </div>
    )
}
