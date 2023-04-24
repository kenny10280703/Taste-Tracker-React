import React from 'react'
import Header from '../components/header/Header'

export default function Signup() {
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        email: ""
    })
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
            <input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type='text'
                placeholder='E-mail'
                name='email'
                value={formData.email}
                onChange={handleChange}
            />
            <button>Login</button>
        </form>
    </div>
  )
}
