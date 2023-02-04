import React from 'react'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import axios, { AxiosResponse } from 'axios'
import { API } from '@config'

export default function Login() {

    // Setups
    const navigate = useNavigate()
    const signIn = useSignIn()
    const isAuthenticated = useIsAuthenticated()

    // States
    const [login, setLogin] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [rerender, setReRender] = React.useState<number>(0)

    // Handlers
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    // Functions
    const userSignIn = () => {
        axios.post(`${API.baseURL}/users/login`, {
            login,
            password,
        }).then((response: AxiosResponse) => {
            if (!response.data.err) {
                if (signIn({
                    token: response.data.token,
                    expiresIn: response.data.expiresIn,
                    tokenType: 'Bearer',
                    authState: response.data.docs,
                })) {
                    ReRender()
                }
            }
        })
    }

    function ReRender() {
        setReRender(rerender + 1)
    }

    React.useEffect(() => {
        if (isAuthenticated()) {
            navigate('/')
        }
        window.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                const loginButton = document.getElementById('loginbtn') as HTMLElement
                loginButton.click()
            }
        })
    }, [rerender])

    return (
        <div className='flex justify-center items-center h-screen flex-col '>
            <div className='bg-neutral-900 p-4 flex flex-col rounded shadow'>

                    <TextField label={'login'} variant="outlined" sx={{ marginBottom: 1}} onChange={handleLoginChange} />
                    <TextField label={'password'} variant="outlined" sx={{ marginBottom: 1}} type="password" onChange={handlePasswordChange} />
                <Button id="loginbtn" variant='contained' fullWidth onClick={userSignIn}>Login</Button>
            </div>
        </div>
    )
}