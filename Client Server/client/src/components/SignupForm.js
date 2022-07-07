import React from 'react'
import FormSideBar from './FormSideBar';
import { registerUser } from "../middleware/user-api"
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'


export default function SignupForm() {
    const navigate = useNavigate()
    const initialRegisterState = {
        user_name: "",
        email: "",
        password: ""
    }
    const propsParameter = {
        heading: "Welcome Back!",
        description: "To Keep connected sign in with your personal details",
        route: "login",
        from: "left"
    }

    React.useEffect(() => {
        if(Cookie.get('cid')){
            navigate('/movielist')
        }
    }, [])

    const [loginCredentials, setLoginCredentials] = React.useState(initialRegisterState);
    const changeHandler = (event) => {
        setLoginCredentials({
            ...loginCredentials,
            [event.target.name]: event.target.value
        })
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const result = await registerUser(loginCredentials);
        if(result.message){
            navigate('/login')
        }        
    }
    return (
        <div className='d-flex'>
            <FormSideBar {...propsParameter} />
            <div className='form-wrapper'>
                <h1>Create Your Account</h1>
                <p>Register Using Social Networks</p>
                <hr />
                <form onSubmit={submitHandler} className='form-inputs'>
                    <input type="text" name='user_name' value={loginCredentials.user_name} placeholder="Username" onChange={changeHandler} />
                    <input type="text" name='email' value={loginCredentials.email} placeholder="Email" onChange={changeHandler} />
                    <input type="password" name='password' value={loginCredentials.password} placeholder="Password" onChange={changeHandler} />
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>

    )
}
