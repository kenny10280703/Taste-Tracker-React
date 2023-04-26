import React from 'react'
import Header from '../components/header/Header'

export default function Signup() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: ""
    })
    const [error, setError] = React.useState({
        showError: false,
        message: ""
    })
    const forbiddenChars = /[&<>[]#$]/
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
    const handleSubmit = async(event) => {
        event.preventDefault()
        if (!forbiddenChars.test(formData.username)) {

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
