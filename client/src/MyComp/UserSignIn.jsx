import React, { useState } from 'react'
import { Avatar, FormControlLabel, Button, CssBaseline, TextField, Checkbox, Typography, Container, makeStyles,  Box  ,Link as MiLink} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Copyright, LockOpenSharp , CropSquareSharp , CheckCircle} from '@material-ui/icons';

import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    paper: {
        margintop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color : 'primary'
    }
})

)

export const UserSignIn = (setCookie) => {
    const classes = useStyles()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [remember, setRemember] = useState(false)

   

    const handleSignIn = (e) => {
        e.preventDefault()

        const user = { username, password, email, remember }

        axios.post('https://react-shopworld.herokuapp.com/user/signIn', user)
            .then((result ) =>  {

                if (result.data.err) {
                    alert(result.data.err)
                }
                else {
                    alert('account created successfully');
                    localStorage.setItem('loginUser', JSON.stringify(result.data))
                    window.location.href = '/'
                }

            }
            )
            .catch((err) => alert('Nerwork connection problem'))
    }



    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component='h1' varian='h5' className='text-center mt-2'>
                    <Avatar className='m-auto bg-dark'>
                        <LockOpenSharp className={classes.avatar} />
                    </Avatar>
                    Create Account
                </Typography>

                <form className='w-100 mt-4' noValidate onSubmit={handleSignIn}>

                    <TextField variant='outlined' margin='normal' id='name' label='Enter username' autoComplete='name' autoFocus required fullWidth onChange={(e) => { setUsername(e.target.value) }} />

                    <TextField variant='outlined' margin='normal' id='email' label='email add' autoComplete='email' autoFocus required fullWidth type='email' onChange={(e) => { setEmail(e.target.value) }} />

                    <TextField variant='outlined' margin='normal' id='password' label='create password' autoComplete='current-password' type='password' autoFocus required fullWidth onChange={(e) => { setPassword(e.target.value) }} />

                    <TextField variant='outlined' margin='normal' id='password' label='retype password' autoComplete='current-password' type='password' autoFocus required fullWidth onChange={(e) => { setPassword(e.target.value) }} />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                color='primary'
                                icon = {<CropSquareSharp/>}  ///when it is false
                                checkedIcon = {<CheckCircle/>}  //when it is true
                                inputProps = {{
                                    'aria-label'  : 'Remember checkbox'
                                }}
                            />}
                        label='Remember Me ??' />


                    <Button type='submit' fullWidth variant='contained'  className={classes.submit}>Create Account</Button>


                </form>

            </div>

            <Box mt={1} className='text-center'>
                All CopyRights  <Copyright /> Reserver By Vk-Reacts.<br />
                <MiLink component = {Link} to = '/'>VkReactShop.com</MiLink>{' '}
                {new Date().getFullYear()} {'.'}
            </Box>

        </Container>
    )
}






//result from post

// config: {url: "http://localhost:4000/user/signIn", method: "post", data: "{\"username\":\"vikash\",\"password\":\"11\",\"email\":\"vikashvermacom92@gmail.com\",\"remember\":true}", headers: {…}, transformRequest: Array(1), …}
// data: {driver: true, name: "MongoError", index: 0, code: 11000, keyPattern: {…}, …}
// headers: {content-length: "119", content-type: "application/json; charset=utf-8"}
// request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
// status: 200
// statusText: "OK"






