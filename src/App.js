import './App.css';
import {AppBar, fade, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Pokemones from "./Pokemones/Pokemones";
import {useEffect, useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    AppBar: {
        backgroundColor: theme.palette.common.black
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    const classes = useStyles();
    const [search, setSearch] = useState('')


    return (
      <>
          <div className={classes.root}>
              <AppBar position="static" className={classes.AppBar}>
                  <Toolbar>
                      {/*<IconButton*/}
                      {/*    edge="start"*/}
                      {/*    className={classes.menuButton}*/}
                      {/*    color="inherit"*/}
                      {/*    aria-label="open drawer"*/}
                      {/*>*/}
                      {/*    <MenuIcon />*/}
                      {/*</IconButton>*/}
                      <Typography className={classes.title} variant="h6" noWrap>
                          pokemonex
                      </Typography>
                      <div className={classes.search}>
                          <div className={classes.searchIcon}>
                              <SearchIcon />
                          </div>
                          <InputBase
                              placeholder="Search…"
                              classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                              }}
                              inputProps={{ 'aria-label': 'search' }}
                              value={search}
                              onChange={(event)=>{setSearch(event.target.value)}}
                          />
                      </div>
                  </Toolbar>
              </AppBar>
          </div>
          <Pokemones search={search}/>
      </>
    );
}

export default App;
