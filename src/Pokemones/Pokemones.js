import React, {useEffect, useState} from "react";
import Pokemone from "./Pokemone";
import {Button, ButtonGroup, Chip, Grid, Typography} from "@material-ui/core";
import Box from '@material-ui/core/Box';
import {Pagination} from "@material-ui/lab";
import '../preloader.css';
import preloaderImg from '../preloader.gif';

function Pokemones({search}) {
    const [pokemones, setPokemones] = useState([])
    const [paginationDelta, setPaginationDelta] = useState(10) // Max: 50
    const [pagination, setPagination] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [tags, setTags] = useState([])
    const [preloader, setPreloader] = useState('hidden-preloader')

    if (localStorage.getItem('selectedTags')===null) {
        localStorage.setItem('selectedTags', JSON.stringify([]))
    }

    // Функція відповідає за стан прелоадера, приймає або 1 або 0
    const isPreloaderRun = (preloaderRun) => {
        if (preloaderRun) {
            setPreloader('show-preloader')
        } else {
            setPreloader('hide-preloader')
            setInterval(()=>{setPreloader('hidden-preloader')}, 990)
        }
    }

    // Завантажуємо всі можливі теги
    const loadAllTagsAPI = () => {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/type/', false )
        xmlHttp.send( null )

        let typesFromAPI = JSON.parse(xmlHttp.responseText).results
        let allTags = []
        for (let typeIndx=0; typeIndx<typesFromAPI.length; typeIndx++) {
            allTags.push(typesFromAPI[typeIndx].name)
        }

        setTags(allTags)
    }

    // Додаємо вибраний тег сховище
    const addTagToSelected = (tagIndx) => {
        isPreloaderRun(true)

        if (! JSON.parse(localStorage.getItem('selectedTags')).includes(tags[tagIndx])) {
            if (JSON.parse(localStorage.getItem('selectedTags')).length>0) {
                localStorage.setItem('selectedTags', JSON.stringify([...JSON.parse(localStorage.getItem('selectedTags')), tags[tagIndx]]))
            } else {
                localStorage.setItem('selectedTags', JSON.stringify([tags[tagIndx]]))
            }
            loadPokemonesList()
        }
    }

    // Видаляємо вибраний тег з сховища
    const delTagFromSelected = (tagStr) => {
        isPreloaderRun(true)

        let newSelectedTags = JSON.parse(localStorage.getItem('selectedTags')).filter((tag)=>{return(tag!==tagStr)})
        localStorage.setItem('selectedTags', JSON.stringify(newSelectedTags))
        loadPokemonesList()
    }

    // Завантажуємо або всіх покемонів, або сортуючи по тегам
    // Кількість всіх покемонів 1118 штук
    const loadPokemonesList = () => {
        let selectedTagsFromCookies = localStorage.getItem('selectedTags')

        if (selectedTagsFromCookies===null) {
            localStorage.setItem('selectedTags', JSON.stringify([]))
        }

        if (JSON.parse(localStorage.getItem('selectedTags')).length!==0) {
            let filteredPokemonesByTags = []

            for (let tagIndx=0; tagIndx<JSON.parse(localStorage.getItem('selectedTags')).length; tagIndx++) {
                let xmlHttp = new XMLHttpRequest()
                xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/type/' + JSON.parse(localStorage.getItem('selectedTags'))[tagIndx], false )
                xmlHttp.send( null )
                let typePokemones = JSON.parse(xmlHttp.responseText).pokemon

                typePokemones.map((pokemon, indx)=>{
                    if (pokemon in filteredPokemonesByTags) {

                    } else {
                        filteredPokemonesByTags.push(pokemon.pokemon)
                    }
                })
            }

            setPokemones(filteredPokemonesByTags)
            setPagination(Math.ceil(filteredPokemonesByTags.length/paginationDelta))
        } else {
            let xmlHttp = new XMLHttpRequest()
            xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0', false ) // Обовязково синхронно
            xmlHttp.send( null )
            setPokemones(JSON.parse(xmlHttp.responseText).results)
            setPagination(Math.ceil(Math.ceil(pokemones.length/paginationDelta)))
        }

        isPreloaderRun(false)
    }

    // Формуємо список покемонів
    const formatPokemonesJSX = () => {
        if (pokemones.length===0 && JSON.parse(localStorage.getItem('selectedTags')).length!==0) {
            return(
                <Typography variant='h3'>Not Found</Typography>
            )
        } else {
            return(
                pokemones.map((pkmn, indx)=>{
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
                })
            )
        }
    }

    // Запускається один раз при першому завантаженні
    useEffect(()=>{
        loadPokemonesList()
        loadAllTagsAPI()
    }, [])

    return(
        <div id="body">
            <div id="preloader" className={preloader}>
                <img alt="preloader" src={preloaderImg}/>
            </div>

            <Box m={3} id="paginator">
                {search === '' &&
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <Pagination defaultPage={1}
                                count={Math.ceil(pokemones.length / paginationDelta)}
                                onChange={(event, page) => {setCurrentPage(page)}}/>
                </Grid>}
            </Box>

            <Box m={2} id="selected-tags">
                <Grid container
                      direction="row"
                      justify="center"
                      spacing={2}
                      alignItems="flex-start">
                    {JSON.parse(localStorage.getItem('selectedTags')).map((tagStr)=>{return(
                        <Grid item>
                            <Chip size={'medium'} color={'secondary'} label={tagStr} onDelete={()=>{
                                delTagFromSelected(tagStr)
                            }}/>
                        </Grid>
                    )})}
                </Grid>
            </Box>

            <Box m={3} id="paginator-delta">
                {search === '' &&
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="flex-start">
                    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                        <Button onClick={()=>{setPaginationDelta(10)}}>10</Button>
                        <Button onClick={()=>{setPaginationDelta(20)}}>20</Button>
                        <Button onClick={()=>{setPaginationDelta(30)}}>30</Button>
                        <Button onClick={()=>{setPaginationDelta(50)}}>50</Button>
                        <Button onClick={()=>{setPaginationDelta(100)}}>100</Button>
                    </ButtonGroup>
                </Grid>}
            </Box>

            <Box m={3} id="pokemones">
                <Grid container
                      spacing={2}
                      justify="space-evenly">
                    {formatPokemonesJSX()}
                </Grid>
            </Box>

            <Box m={3} id="all-tags">
                <Box m={1}><Typography variant={'h4'}>All tags</Typography></Box>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      spacing={2}
                      alignItems="flex-start">
                    {tags.map((tag,indx)=>{return(
                        <Grid item>
                            <Chip size={'medium'} label={tag} onClick={(event)=>{
                                addTagToSelected(indx)
                            }}/>
                        </Grid>
                    )})}
                </Grid>
            </Box>
        </div>
    )
}

export default Pokemones