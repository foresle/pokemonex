import React, {useState} from "react";
import {Button, Grid, makeStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Box from "@material-ui/core/Box";
import validator from "validator/es";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const validateEmail = (event) => {
        setEmail(event.target.value)

        if (! validator.isEmail(event.target.value)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }

    const validatePassword = (event) => {
        setPassword(event.target.value)

        if (event.target.value!=='') {
            setValidPassword(false)
        } else {
            setValidPassword(true)
        }
    }

    const saveToken = (token) => {
        localStorage.setItem('accessToken', JSON.stringify(token))
    }

    const loginUser = async () => {
        if (! (validEmail && validPassword) && (email!=='' && password!=='')) {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            if (response.ok) {
                let json = await response.json()
                await saveToken(json.access_token)
                window.location.href = '/'
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }
    }

    return(
        <>
            <Box m={8}>
                <Grid container
                      direction='column'
                      alignContent='center'
                      justify='center'>
                    <Grid item>
                        <form className={classes.root} noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            <TextField ld
                                       id="outlined-basic"
                                       label="Email"
                                       type="email"
                                       variant="outlined"
                                       error={validEmail}
                                       onChange={(event)=>{validateEmail(event)}}
                                       value={email}/>
                            <br/>
                            <TextField ld
                                       id="outlined-basic"
                                       label="Password"
                                       type="password"
                                       variant="outlined"
                                       error={validPassword}
                                       onChange={(event)=>{validatePassword(event)}}
                                       value={password}/>
                            <br/>
                            <Button onClick={()=>{loginUser()}}>
                                Login
                            </Button>
                        </form>
                    </Grid>
                    <Grid item style={{textAlign: 'center'}}>
                        <Box m={6}>
                            <Link to='/register'>
                                or register
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Login