import {useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import {AppBar, Button, fade, makeStyles, Toolbar, Typography} from "@material-ui/core";

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import PokemonList from "./PokemonList";
import Login from "./Login";
import Register from "./Register";

const useMaterialStylesAppBar = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function App() {
    const materialClassesAppBar = useMaterialStylesAppBar();
    const [search, setSearch] = useState('')

    return (
        <>
            <Router>
                <AppBar color="primary" position="static" className={materialClassesAppBar.root}>
                    <Toolbar>
                        <Typography variant="h6" noWrap className={materialClassesAppBar.title}><Link to='/' style={{textDecoration: 'none', color: 'white'}}>pokemonex</Link></Typography>
                        <Button color="inherit"><Link to='/login' style={{textDecoration: 'none', color: 'white'}}>Login</Link></Button>
                        <Button color="inherit"><Link to='/register' style={{textDecoration: 'none', color: 'white'}}>Register</Link></Button>
                        <div className={materialClassesAppBar.search}>
                            <div className={materialClassesAppBar.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                classes={{
                                    root: materialClassesAppBar.inputRoot,
                                    input: materialClassesAppBar.inputInput
                                }}
                                placeholder="Search…"
                                value={search}
                                onChange={(event)=>{setSearch(event.target.value)}}
                            />
                        </div>
                    </Toolbar>
                </AppBar>

                <Switch>
                    <Route from='/register'>
                        <Register/>
                    </Route>
                    <Route from='/login'>
                        <Login/>
                    </Route>
                    <Route from='/'>
                        <PokemonList searchQuery={search}/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App
