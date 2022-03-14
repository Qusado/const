import React from 'react';
import {useRoutes} from "./routes";
import { BrowserRouter as Router} from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/Auth.Context";
import {Main_Nav} from "./components/Main_Nav";


function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenficated = !!token
  const routes = useRoutes(isAuthenficated)

  return (
      <AuthContext.Provider value={{
        token, login,logout, userId, isAuthenficated
      }}>
        <Router>
          <Main_Nav/>
          <div className="content">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
