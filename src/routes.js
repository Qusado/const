import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import {MainPage} from './pages/main.page.js';
import {LoginPage} from "./pages/login.page";
import {BasePage} from "./pages/base.page";
import {ConstructorPage} from "./pages/constructor.page";
import {AsIsPage} from "./pages/asIs.page";
import {SourcePage} from "./pages/source.page";
import Flow_block from "./components/Flow_block";


export const useRoutes = isAuthenticated => {
        // if(isAuthenticated)
        {
                return (
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/constructor" component={ConstructorPage}/>
                        <Route exact path="/dataBase" component={BasePage}/>
                        <Route exact path="/flow" component={Flow_block}/>

                        <Route exact path="/constructor/asis" component={AsIsPage}/>
                        <Route exact path="/constructor/source" component={SourcePage}/>
                            <Redirect to="/"/>
                    </Switch>
                )
        }
        // else{
        //         return (
        //             <Switch>
        //                 <Route path="/login" exact>
        //                     <LoginPage/>
        //                 </Route>
        //                 <Route exact path="/" component={MainPage}/>
        //                 <Route exact path="/dataBase" component={BasePage}/>
        //                 <Redirect to="/login"/>
        //             </Switch>
        //         )
        // }
}
