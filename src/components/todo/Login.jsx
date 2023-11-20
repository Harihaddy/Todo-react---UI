import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useAuth } from './security/AuthContext'
export default function Login() {

const authContext=useAuth()


    const [username, setusername] = useState('Haddy')
    const [password, setPassword] = useState('')
    const [showErrorMessage, setshowErrorMessage] = useState(false)
    
    const navigate = useNavigate()

    function handleUsernameChaneg(event) {
        setusername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(username,password)) {
            navigate(`/welcome/${username}`)
           
        } else {
            setshowErrorMessage(true);
        }
    }

    return (
        <div className='Login'>
            <h1>Time to Login</h1>
            {showErrorMessage && <div className='errorMessage'>Authenticated Failed. Pleas check Your credentials.</div>}

            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" value={username} onChange={handleUsernameChaneg} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="username" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" name="submit" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}