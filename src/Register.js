import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import {Button, Grid, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import validator from "validator/es";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Register() {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validName, setValidName] = useState(false)

    const validateEmail = (event) => {
        setEmail(event.target.value)

        if (! validator.isEmail(event.target.value)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }

    const validateName = (event) => {
        setName(event.target.value)

        if (event.target.value!=='') {
            setValidName(false)
        } else {
            setValidName(true)
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

    const registerUser = async () => {
        if (! (validEmail && validPassword) && (email!=='' && password!=='')) {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })

            if (response.ok) {
                let json = await response.json()
                saveToken(json.access_token)
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
                      alignContent='center'
                      justify='center'>
                    <Grid item>
                        <form className={classes.root} noValidate autoComplete="off" style={{textAlign: 'center'}}>
                            <TextField ld
                                       id="outlined-basic"
                                       label="Name"
                                       type="text"
                                       variant="outlined"
                                       error={validName}
                                       onChange={(event)=>{validateName(event)}}
                                       value={name}/>
                            <br/>
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
                            <Button onClick={()=>{registerUser()}}>
                                Register
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Register