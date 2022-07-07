import React from 'react'
import FormSideBar from './FormSideBar';
import { useDispatch, useSelector} from "react-redux"
import { login } from "../middleware/user-api"
import { useNavigate } from "react-router-dom"
import Cookie from 'js-cookie'

export default function LoginForm() {
    const navigate = useNavigate()
    const state = useSelector(state => state);
    const dispatch = useDispatch()
    const initialLoginState = {
        email: "",
        password: ""
    }
    const propsParameter = {
        heading: "Hello Friend!",
        description: "Enter your credentials and start your journey with us",
        route: "signup"
    }
    React.useEffect(() => {
        if(Cookie.get('cid')){
            navigate('/movielist')
        }
    }, [])
    const [loginCredentials, setLoginCredentials] = React.useState(initialLoginState);
    const changeHandler = (event) => {
        setLoginCredentials({
            ...loginCredentials,
            [event.target.name] : event.target.value
        })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await login(loginCredentials)
        if(result.id){
            dispatch({
                type: "SAVE_CREDENTIALS",
                payload: result
            })
            navigate('/movielist')
        }
        
    }
  return (
    <div className='d-flex'>
<div className='form-wrapper'>
        <h1>Login In To Your Account</h1>
        <p>Login Using Social Networks</p>
        <hr />
        <form onSubmit={submitHandler} className='form-inputs'>
            <input type="text" name='email' value={loginCredentials.email} placeholder="Email" onChange={changeHandler}  />
            <input type="password" name='password' value={loginCredentials.password} placeholder="Password" onChange={changeHandler}  />
            <button type='submit'>Login</button>
        </form>
    </div>
    <FormSideBar {...propsParameter} />
    </div>
    
  )
}
