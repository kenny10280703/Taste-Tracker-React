import React from 'react'
import Header from '../components/header/Header'
import { AppContext } from '../AppContext'

export default function Login() {
    const { login } = React.useState(AppContext)
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: ""
    })
    const [errorMessage, setErrorMessage] = React.useState("")
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
        console.log(formData)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch("", 
            {
                method: "POST",
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    email: formData.email
                })
            })
            if (res.status === 200) {
                const { user, token} = await res.json()
                login(user, token)
            } else {
                const { message } = res.json
                setErrorMessage(message)
            }
        } catch(error) {
            console.log("error during login")
        }

    }
  return (
    <div>
        <Header />
        <h2>Login</h2>
        <form>
            <input
                type='text'
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleChange}
            />
            <br />
            <input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            <br />
            <input
                type='text'
                placeholder='E-mail'
                name='email'
                value={formData.email}
                onChange={handleChange}
            />
            <br />
            <button>Login</button>
        </form>
    </div>
  )
}
