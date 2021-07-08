import React, {useEffect, useState} from "react";

import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Chip,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Radar} from "react-chartjs-2";


const useMaterialStylesCard = makeStyles({
    root: {
        maxWidth: 345,
        width: 300
    },
    media: {
        height: 300,
    },
})


function Pokemon({pokemonName, favoritePokemonList}) {
    const materialClassesCard = useMaterialStylesCard()
    const [card, setCard] = useState(<></>)
    const [cardMediaIsImage, setCardMediaIsImage] = useState(true)
    let [localFavoritePokemonList, setLocalFavoritePokemonList] = useState(favoritePokemonList)


    const makeCard = async () => {
        let responsePokemon = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName, {method: 'GET'})

        if (responsePokemon.ok) {
            return await responsePokemon.json()
        } else {
            alert('Вибачте виникла помилка')
        }
    }


    const setFavorite = async (pokemonID) => {
        const response = await fetch('http://127.0.0.1:5000/favorite/'+pokemonID, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+JSON.parse(localStorage.getItem('accessToken'))
            }
        })

        if (! response.ok) {
            window.location.href = '/login'
        } else {
            setLocalFavoritePokemonList([...localFavoritePokemonList, pokemonID])
        }
    }


    const setUnfavored = async (pokemonID) => {
        const response = await fetch('http://127.0.0.1:5000/unfavored/'+pokemonID, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+JSON.parse(localStorage.getItem('accessToken'))
            }
        })

        if (! response.ok) {
            window.location.href = '/login'
        } else {
            setLocalFavoritePokemonList(localFavoritePokemonList.filter((id) => {return (id!==pokemonID)}))
        }
    }


    useEffect(() => {
        makeCard().then((pokemon)=>{
            const chartData = {
                labels: [
                    pokemon.stats[0].stat.name,
                    pokemon.stats[1].stat.name,
                    pokemon.stats[2].stat.name,
                    pokemon.stats[3].stat.name,
                    pokemon.stats[4].stat.name,
                    pokemon.stats[5].stat.name
                ],
                datasets: [{
                    label: pokemon.name,
                    data: [pokemon.stats[0].base_stat,
                        pokemon.stats[1].base_stat,
                        pokemon.stats[2].base_stat,
                        pokemon.stats[3].base_stat,
                        pokemon.stats[4].base_stat,
                        pokemon.stats[5].base_stat],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }]
            }


            setCard(
                <Card className={materialClassesCard.root}>
                    <CardActionArea onClick={() => {setCardMediaIsImage(! cardMediaIsImage)}}>
                        {cardMediaIsImage
                        ?
                        <CardMedia
                            className={materialClassesCard.media}
                            image={"https://pokeres.bastionbot.org/images/pokemon/" + pokemon.id + ".png"}
                            title={pokemon.name}/>
                        :
                        <Radar data={chartData} type="undefined" />
                        }
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {pokemon.name}
                            </Typography>
                            <Grid container justify="flex-start" spacing={1}>
                                {pokemon.types.map((type) => {
                                    return (<Grid item><Chip size={'small'} color={'primary'} label={type.type.name}/></Grid>)
                                })}
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {localFavoritePokemonList.includes(pokemon.id)
                        ?
                        <Button size="medium" onClick={() => {
                            setUnfavored(pokemon.id).then(r => {})
                        }} color="primary">
                            Unfavored
                        </Button>
                        :
                        <Button size="medium" onClick={() => {
                            setFavorite(pokemon.id).then(r => {})
                        }} color="primary">
                            Favorite
                        </Button>
                        }
                    </CardActions>
                </Card>
            )
        })
    }, [cardMediaIsImage, pokemonName, localFavoritePokemonList])

    return (
        <Grid item>
            {card}
        </Grid>
    )
}

export default Pokemon