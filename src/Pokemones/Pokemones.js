import React, {useEffect, useState} from "react";
import Pokemone from "./Pokemone";
import {Button, ButtonGroup, Chip, Container, Grid, makeStyles, Radio, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles((theme)=>({
    pokemones: {
        marginBottom: '2rem',
        padding: '0 1rem'
    },
    filterBar: {
        margin: '2rem 0'
    },
    pageDelta: {
        margin: "2rem 0"
    },
    paginator: {
        margin: "2rem 0"
    },
    selectedTags: {
        margin: "2rem 0"
    },
    tagsTypography: {
        margin: "2rem 4rem",
    },
    allTags: {
        margin: "0 4rem",
        marginBottom: "2rem"
    }
}));

function Pokemones({search, preloader}) {
    const classes = useStyles();

    const [pokemones, setPokemones] = useState([])
    const [filteredPokemonesByTags, setFilteredPokemonesByTags] = useState([])
    const [paginationDelta, setPaginationDelta] = useState(10) // Max: 50
    const [pagination, setPagination] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [tags, setTags] = useState(['grass', 'electric', 'fire', 'ground', 'rock'])
    const [selectedTags, setSelectedTags] = useState([])

    const addTagToSelected = (tagIndx) => {
        if (! selectedTags.includes(tags[tagIndx])) {
            setSelectedTags([...selectedTags, tags[tagIndx]])
        }
    }

    const delTagFromSelected = (tagStr) => {
        let newSelectedTags = []
        selectedTags.map((tag, indx)=>{
            if (tag !== tagStr) {
                newSelectedTags.push(tag)
            }
        })
        setSelectedTags(newSelectedTags)
    }

    useEffect(()=>{
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0', false ) // Max pokemones is 1118
        xmlHttp.send( null )
        setPokemones(JSON.parse(xmlHttp.responseText).results)
        setPagination(Math.ceil(JSON.parse(xmlHttp.responseText).results.length/paginationDelta))
    }, [])

    if (selectedTags.length!==0) {

        pokemones.map((pkmn,pkmnIndx)=>{
            if (pkmnIndx in filteredPokemonesByTags) {

            } else {
                let xmlHttp = new XMLHttpRequest()
                xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/pokemon/'+pkmn.name, false )
                xmlHttp.send( null )
                let pkmnTypes = JSON.parse(xmlHttp.responseText).types
                pkmnTypes.map((type, typeIndx)=>{
                    for (let tagIndx=0; tagIndx<selectedTags.length; tagIndx++) {
                        if (type.type.name===selectedTags[tagIndx]) {
                            setFilteredPokemonesByTags([...filteredPokemonesByTags, pkmnIndx])
                            break
                        }
                    }
                })
            }
        })
    }

    if (filteredPokemonesByTags.length!==0) {
        setPagination(Math.ceil(filteredPokemonesByTags.length/paginationDelta))
    }


    return(
        <>
            <Grid container justify={"space-evenly"} xs={12} className={classes.filterBar}>
                <Grid container justify={"center"} className={classes.selectedTags} spacing={1}>
                    {selectedTags.map((tagStr, indx)=>{return(
                        <Grid item>
                            <Chip size={'medium'} color={'secondary'} label={tagStr} onDelete={(event)=>{
                                delTagFromSelected(tagStr)
                            }}/>
                        </Grid>
                    )})}
                </Grid>
                <Grid item>
                    {search === '' && <Pagination className={classes.paginator}
                                                  defaultPage={1}
                                                  count={Math.ceil(pokemones.length / paginationDelta)}
                                                  onChange={(event, page) => {
                                                      setCurrentPage(page)
                                                  }}/>}
                </Grid>
                {search === '' && <Grid item className={classes.pageDelta}>
                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                        <Button onClick={(event)=>{setPaginationDelta(10)}}>10</Button>
                        <Button onClick={(event)=>{setPaginationDelta(20)}}>20</Button>
                        <Button onClick={(event)=>{setPaginationDelta(30)}}>30</Button>
                        <Button onClick={(event)=>{setPaginationDelta(50)}}>50</Button>
                        <Button onClick={(event)=>{setPaginationDelta(100)}}>100</Button>
                    </ButtonGroup>
                </Grid>}
            </Grid>
            <Grid container spacing={2} justify="space-evenly" xs={12} className={classes.pokemones}>
                {pokemones.map((pkmn, indx)=>{
                    if (filteredPokemonesByTags.length!==0) {

                    } else {
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
                    }
                })}
            </Grid>
            <Typography className={classes.tagsTypography} variant={'h4'}>All tags</Typography>
            <Grid container className={classes.allTags} xs={6} spacing={'1'}>
                {tags.map((tag,indx)=>{return(
                    <Grid item>
                        <Chip size={'medium'} label={tag} onClick={(event)=>{
                            addTagToSelected(indx)
                        }}/>
                    </Grid>
                )})}
            </Grid>
        </>
    )
}

export default Pokemones