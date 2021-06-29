import React, {useEffect, useState} from "react";
import Pokemone from "./Pokemone";
import {Container, Grid, makeStyles, Radio} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles((theme)=>({
    root: {
        marginBottom: '2rem',
        padding: '0 1rem'
    },
    filter_bar: {
        margin: '2rem 0'
    },
    not_found: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1)
    }
}));

function Pokemones({search}) {
    const classes = useStyles();

    const [pokemones, setPokemones] = useState([])
    const [paginationDelta, setPaginationDelta] = useState(20) // Max: 50
    const [pagination, setPagination] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0', false ) // Max pokemones is 1118
        xmlHttp.send( null )
        setPokemones(JSON.parse(xmlHttp.responseText).results)
        setPagination(Math.ceil(JSON.parse(xmlHttp.responseText).results.length/paginationDelta))
    }, [])


    return(
        <>
            <Grid container justify={"space-evenly"} xs={12} className={classes.filter_bar}>
                <Grid item>
                    {search === '' && <Pagination defaultPage={1}
                                                  count={Math.ceil(pokemones.length / paginationDelta)}
                                                  onChange={(event, page) => {
                                                      setCurrentPage(page)
                                                  }}/>}
                </Grid>
                <Grid item>
                    <Radio
                        checked={paginationDelta == 10}
                        onChange={(event)=>{setPaginationDelta(event.target.value)}}
                        value={10}
                        label="Bottom"
                    />
                    <Radio
                        checked={paginationDelta == 20}
                        onChange={(event)=>{setPaginationDelta(event.target.value)}}
                        value={20}
                    />
                    <Radio
                        checked={paginationDelta == 50}
                        onChange={(event)=>{setPaginationDelta(event.target.value)}}
                        value={50}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justify="space-evenly" xs={12} className={classes.root}>
                {pokemones.map((pkmn, indx)=>{
                    if (search===''){
                        if (indx < paginationDelta*currentPage && indx > paginationDelta*currentPage-paginationDelta-1) {
                            return(
                                <Pokemone pkmn={pkmn}/>
                            )
                        }
                    } else {
                        if (pkmn.name.slice(0,search.length)===search) {
                            return(
                                <Pokemone pkmn={pkmn}/>
                            )
                        }
                    }
                })}
            </Grid>
        </>
    )
}

export default Pokemones