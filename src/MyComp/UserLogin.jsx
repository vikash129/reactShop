import React, { useState } from 'react'
import { Avatar, FormControlLabel, Button, CssBaseline, TextField, Checkbox, Typography, Container, makeStyles, Grid, Box, Link as MiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';


import { Copyright, LockOutlined, CheckCircle, CropSquareSharp } from '@material-ui/icons';

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
        margin: theme.spacing(3, 0, 2)
    }
})

)

export const UserLogin = ({setCookie}) => {

    const [name, setName] = useState('')
    const [pass, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        const user = { 'username': name, 'password': pass, 'remember': remember }

        axios.post('http://localhost:4000/user/login', user)

            .then((result) => {
                if (result.data.err) {
                    alert(result.data.err)
                }
                else {
                    setCookie('loginUser', result.data ,{path : '/'})

                    alert('successfullt loged in');
                    window.location.href = '/'


                }
            })
            .catch((err) => alert('Nerwork connection problem'))

    }




    const classes = useStyles()


    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>



                {/* <Typography component='h1' variant='h5' className='text-center mt-2'>
                    <Avatar className='m-auto bg-dark'>
                        <LockOutlined className={classes.avatar} />
                    </Avatar>
                    Log In
                </Typography> */}

                <form className='w-100 mt-4' noValidate onSubmit={handleLogin}>

                    <TextField variant='outlined' margin='normal' id='name' label='Enter Your username' autoComplete='name' autoFocus required fullWidth onChange={(e) => { setName(e.target.value) }} />

                    <TextField variant='outlined' margin='normal' id='password' label='password' autoComplete='current-password' type='password' autoFocus required fullWidth onChange={(e) => { setPassword(e.target.value) }} />


                    <FormControlLabel
                        control={
                            <Checkbox
                                value={remember}
                                onChange={() => setRemember(!remember)}
                                color='primary'
                                icon={<CropSquareSharp />}  ///when it is false
                                checkedIcon={<CheckCircle />}  //when it is true
                                inputProps={{
                                    'aria-label': 'Remember checkbox'
                                }}
                            />}
                        label='Remember Me ??' />


                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Login </Button>

                    <Grid container>

                        <Grid item xs>
                            <MiLink to='#' component={Link} >Forgot password ? </MiLink>
                        </Grid>

                        <Grid item >
                            <MiLink component={Link} to='/signIn' variant='contained' color='primary'>Don't have an account ?? Sign Up</MiLink>
                        </Grid>

                    </Grid>
                </form>

            </div>

            <Box mt={1} className='text-center'>
                All CopyRights  <Copyright /> Reserver By Vk-Reacts.<br />
                <MiLink component={Link} to='/'>VkReactShop.com</MiLink>{' '}
                {new Date().getFullYear()} {'.'}
            </Box>

        </Container>
    )
}
















////{breakpoints: {…}, direction: "ltr", mixins: {…}, overrides: {…}, palette: {…}, …}
// breakpoints: {keys: Array(5), values: {…}, up: ƒ, down: ƒ, between: ƒ, …}
// direction: "ltr"
// mixins: {toolbar: {…}, gutters: ƒ}
// overrides: {}
// palette: {common: {…}, type: "light", primary: {…}, secondary: {…}, error: {…}, …}
// props: {}
// shadows: (25) ["none", "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)", 
// shape: {borderRadius: 4}
// spacing: ƒ spacing()
// transitions: {easing: {…}, duration: {…}, create: ƒ, getAutoHeightDuration: ƒ}
// typography: {htmlFontSize: 16, fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontSize: 14, pxToRem: ƒ, round: ƒ, …}
// zIndex: {mobileStepper: 1000, speedDial: 1050, appBar: 1100, drawer: 1200, modal: 1300, …}


////
// palette:
// action: {active: "rgba(0, 0, 0, 0.54)", hover: "rgba(0, 0, 0, 0.04)", hoverOpacity: 0.04, selected: "rgba(0, 0, 0, 0.08)", selectedOpacity: 0.08, …}
// augmentColor: ƒ augmentColor(color)
// background: {paper: "#fff", default: "#fafafa"}
// common: {black: "#000", white: "#fff"}
// contrastThreshold: 3
// divider: "rgba(0, 0, 0, 0.12)"
// error: {light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff"}
// getContrastText: ƒ getContrastText(background)
// grey: {50: "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 800: "#424242", 900: "#212121", A100: "#d5d5d5", A200: "#aaaaaa", A400: "#303030", A700: "#616161"}
// info: {light: "#64b5f6", main: "#2196f3", dark: "#1976d2", contrastText: "#fff"}
// text: {primary: "rgba(0, 0, 0, 0.87)", secondary: "rgba(0, 0, 0, 0.54)", disabled: "rgba(0, 0, 0, 0.38)", hint: "rgba(0, 0, 0, 0.38)"}
// tonalOffset: 0.2
// type: "light"
// warning: {light: "#ffb74d", main: "#ff9800", dark: "#f57c00", contrastText: "rgba(0, 0, 0, 0.87)"}
// __proto__: Object



////
// typography:
// body1: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.5, letterSpacing: "0.00938em"}
// body2: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.43, letterSpacing: "0.01071em"}
// button: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, letterSpacing: "0.02857em", …}
// caption: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "0.75rem", lineHeight: 1.66, letterSpacing: "0.03333em"}
// fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
// fontSize: 14
// fontWeightBold: 700
// fontWeightLight: 300
// fontWeightMedium: 500
// fontWeightRegular: 400
// h1: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 300, fontSize: "6rem", lineHeight: 1.167, letterSpacing: "-0.01562em"}
// h2: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 300, fontSize: "3.75rem", lineHeight: 1.2, letterSpacing: "-0.00833em"}
// h3: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "3rem", lineHeight: 1.167, letterSpacing: "0em"}
// h4: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "2.125rem", lineHeight: 1.235, letterSpacing: "0.00735em"}
// h5: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "1.5rem", lineHeight: 1.334, letterSpacing: "0em"}
// h6: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 500, fontSize: "1.25rem", lineHeight: 1.6, letterSpacing: "0.0075em"}
// htmlFontSize: 16
// overline: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "0.75rem", lineHeight: 2.66, letterSpacing: "0.08333em", …}
// pxToRem: ƒ (size)
// round: ƒ round(value)
// subtitle1: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 400, fontSize: "1rem", lineHeight: 1.75, letterSpacing: "0.00938em"}
// subtitle2: {fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.57, letterSpacing: "0.00714em"}
// __proto__: Object