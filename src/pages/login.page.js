import React, {useContext, useEffect, useState} from 'react'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import {NavLink, useHistory} from 'react-router-dom'
import {$host} from "../http";
import {AuthContext} from "../context/Auth.Context";
import { useAlert } from 'react-alert';
import {baseUrl} from "../components/baseRoute";


export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const alert = useAlert()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const fetched = await $host.post(`/api/users/login`, {...form})
                .catch(function (error) {
                    ViewAlert(error.response);
                })
                .then(res => auth.login(res.data));
            history.push('/');
        } catch (e) {

        }
    }

    function ViewAlert(response){
        alert.show(response.data.message);
    }


    return(
        <>
            <img className="BackPic" src="./images/fon4.png"/>
            <div className="first_box" style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(2px)",
            zIndex:'3',
            position:"absolute",
                top: "7vh",
                left: "0",
                height: "93vh",
                width: '100%'
            }}>
                <div className="row justify-content-md-center" style={{margin: '10%'}}>
                    <div className="card col-8 offset-s3">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label b">Email address</label>
                                <input
                                    type="email"
                                    className="form-control _req _email"
                                    aria-describedby="emailHelp"
                                    id="email"
                                    name="email"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                <span className="" />
                            </div>
                            <span className="_err-message-span" />
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label b">Password</label>
                                <input type="password" className="form-control _req _password"
                                       name="password" id="password"
                                       onChange={changeHandler}
                                       value={form.password}/>
                                <span className="" />
                            </div>
                            <span className="_err-message-span" />

                        </div>
                        <button
                            className=" btn btn-light m-4"
                            onClick={registerHandler}
                            disabled={loading}>
                            LogIn
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
