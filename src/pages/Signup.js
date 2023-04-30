import React from 'react'
import Header from '../components/header/Header'

export default function Signup() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: ""
    })
    const [message, setMessage] = React.useState()
    const forbiddenChars = /[&<>[]#$]/
    const handleChange = (event) => {
        const { name, value } = event.target
        if (!forbiddenChars.test(value)) {
            setMessage(`${name} can not contains the following special characters: /[&<>[]#$`)
        } else {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name] : value
                }
            })
        }
        
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            const res = await fetch("", 
            {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                })
            })
            if (res.response === 200) {
                setMessage("Register successful! Thank you for joining us!")
            } else {
                const { message } = res.json()
                setMessage(message)
            }
        } catch (error) {
            setMessage(error.message)
        }
    }

  return (
    <div>
        <Header />
        <h2>Signup</h2>
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
                type='email'
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
