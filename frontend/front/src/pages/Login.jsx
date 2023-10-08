import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
       await login(email, password);
    
    }


  return (
    <form onSubmit={handleSubmit} className="login">
    
    <h3>Войти</h3>

    <label>Email:</label>
    <input
    value={email}
    type="text"
    onChange={(e) => {setEmail(e.target.value)
    console.log(email);}}
    />

<label>Пароль:</label>
    <input
    value={password}
    type="password"
    onChange={(e) => setPassword(e.target.value)}
    />

    <button disabled={isLoading}>Войти</button>
    {error && <div className='error'>{error}</div>}
    </form>
  )
}
