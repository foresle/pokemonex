import React, {useEffect, useState} from "react"

import Pokemon from "./Pokemon"
import {Box, Button, ButtonGroup, Chip, Grid, Typography} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";

function PokemonList({searchQuery}) {
    const [pokemonList, setPokemonList] = useState([])
    let [selectedTags, setSelectedTags] = useState([])
    let [paginationDelta, setPaginationDelta] = useState(10)
    let [paginationCount, setPaginationCount] = useState(1)
    let [currentPage, setCurrentPage] = useState(1)
    let [onlyFavorite, setOnlyFavorite] = useState(0)
    let [allTags, setAllTags] = useState([])
    let [favoritePokemonListFromToken, setFavoritePokemonListFromToken] = useState([])


    const makePokemonList = async () => {
        let newPokemonList = []
        let newSelectedTags

        // Якщо не збереженно вибраних тегів то кладемо пустий массив
        if (localStorage.getItem('selectedTags')===null) {
            localStorage.setItem('selectedTags', JSON.stringify([]))
            newSelectedTags = []
        } else {
            newSelectedTags = JSON.parse(localStorage.getItem('selectedTags'))
        }
        selectedTags = newSelectedTags

        // Спочатку завантажуємо список покемоннів в залежності від  того чи вибранні теги
        if (newSelectedTags.length===0) {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0')
            let json = await response.json()
            newPokemonList = json.results
            let favoritePokemonList = []

            // Якщо треба то сортуємо улюбленних покемоннів
            if (onlyFavorite) {
                for (let index = 0; index<favoritePokemonListFromToken.length; index++) {
                    favoritePokemonList.push(newPokemonList[favoritePokemonListFromToken[index]-1])
                }

                newPokemonList = favoritePokemonList
            }

        } else {
            // Сортуватти улюбленних покемонів по тегам не можна (доступні методи забирають багато часу)
            onlyFavorite = false

            for (let index=0; index<selectedTags.length; index++) {
                const response = await fetch('https://pokeapi.co/api/v2/type/' + selectedTags[index])
                let json = await response.json()
                let tempPokemonListByType = json.pokemon

                for (let index=0; index<tempPokemonListByType.length; index++) {
                    if (! (tempPokemonListByType[index] in newPokemonList)) {
                        newPokemonList.push(tempPokemonListByType[index].pokemon)
                    }
                }
            }
        }

        // Якщо є пошуковий запис то сортуємо
        if (searchQuery !== '') {
            let searchPokemonList = newPokemonList.filter((pokemon) => {return (pokemon.name.slice(0, searchQuery.length) === searchQuery)})

            newPokemonList = searchPokemonList
        }

        // Обрізаємо список покемонів по пагінації
        if (newPokemonList.length !== 0) {
            setPaginationCount(Math.ceil(newPokemonList.length/paginationDelta))
            let endPaginationIndex = paginationDelta*currentPage
            let startPaginationIndex = paginationDelta*currentPage-paginationDelta

            newPokemonList = newPokemonList.slice(startPaginationIndex, endPaginationIndex)
        } else {
            paginationCount = 1
        }

        setPokemonList(newPokemonList)
    }


    const loadAllTags = async () => {
        const responseAllTags = await fetch('https://pokeapi.co/api/v2/type/', {method: 'GET'})
        if (responseAllTags.ok) {
            let newAllTags = await responseAllTags.json()
            setAllTags(newAllTags.results)
        }
    }


    const addSelectedTag = (tagName) => {
        if (! selectedTags.includes(tagName)) {
            let newSelectedTags = [...selectedTags, tagName]
            localStorage.setItem('selectedTags', JSON.stringify(newSelectedTags))
            setSelectedTags(newSelectedTags)
        }
    }


    const removeSelectedTag = (tagName) => {
        let newSelectedTags = selectedTags.filter((tag)=>{return(tag!==tagName)})
        localStorage.setItem('selectedTags', JSON.stringify(newSelectedTags))
        setSelectedTags(newSelectedTags)
    }


    const loadFavoritePokemonListFromToken = async () => {
        const userFavoritePokemonListResponse = await fetch('http://127.0.0.1:5000/my_favorite', {
            method: 'GET', headers: {'Authorization': "Bearer "+JSON.parse(localStorage.getItem('accessToken'))}})

        if (userFavoritePokemonListResponse.ok) {
            let userFavoritePokemonList = await userFavoritePokemonListResponse.json()

            setFavoritePokemonListFromToken(userFavoritePokemonList)
        } else {
            alert('Будь-ласка авторизуйтесь спочатку')
            window.location.href = '/login'
        }
    }


    useEffect( async ()=>{
        await loadFavoritePokemonListFromToken()
        await makePokemonList()
        await loadAllTags()
    }, [searchQuery, selectedTags, paginationDelta, currentPage, onlyFavorite])


    return (
        <>
            <Box id="topMenu" m={4}>
                <Box m={2}>
                    <Grid container justify="center">
                        <Grid item>
                            <Pagination defaultPage={1}
                                        count={paginationCount}
                                        page={currentPage}
                                        onChange={(event, page) => {setCurrentPage(page)}}/>
                        </Grid>
                    </Grid>
                </Box>

                <Box m={2}>
                    <Grid container justify="center">
                        <Grid item>
                            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                <Button variant={paginationDelta===10 ? "contained" : "outlined"} onClick={()=>{setPaginationDelta(10); setCurrentPage(1)}}>10</Button>
                                <Button variant={paginationDelta===20 ? "contained" : "outlined"} onClick={()=>{setPaginationDelta(20); setCurrentPage(1)}}>20</Button>
                                <Button variant={paginationDelta===50 ? "contained" : "outlined"} onClick={()=>{setPaginationDelta(50); setCurrentPage(1)}}>50</Button>
                                <Button variant={onlyFavorite ? "contained" : "outlined"} onClick={()=>{selectedTags.length===0 ? setOnlyFavorite(! onlyFavorite) : alert('Спочатку відключіть всі теги')}}>Favorite Pokemon</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>

                <Box m={2}>
                    <Grid container justify="center" spacing={2}>
                        {selectedTags.map((tagName, index)=>{
                            return(
                                <Grid item>
                                    <Chip key={index} size="small" label={tagName} onDelete={()=>{removeSelectedTag(tagName)}}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Box>

            <Box id="pokemonList" m={4}>
                <Grid container justify="space-evenly" spacing={2}>
                    {pokemonList.length !== 0
                        ?
                        pokemonList.map((pokemon, index)=>{
                            return (<Pokemon key={index} pokemonName={pokemon.name} favoritePokemonList={favoritePokemonListFromToken} />)
                        })
                        :
                        <>Not Found</>
                    }
                </Grid>
            </Box>

            <Box id="allTags" m={4} textAlign="center">
                <Box m={2}><Typography variant="h4">Всі теги</Typography></Box>
                <Grid container justify="center" spacing={2}>
                    {allTags.map((tag, index)=>{
                        return(
                            <Grid item>
                                <Chip key={index} size={'medium'} label={tag.name} onClick={()=>{addSelectedTag(tag.name); setOnlyFavorite(! onlyFavorite)}}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </>
    )
}

export default PokemonList