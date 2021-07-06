import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
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
});

function Pokemone({pkmn}) {
    const materialClassesCard = useMaterialStylesCard();
    const [cardIsHover, setCardIsHover] = useState(false)
    const [favPokemon, setFavPokemon] = useState([])

    const getFavoritePokemones = () => {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", 'http://127.0.0.1:5000/my_favorite', false)
        xmlHttp.setRequestHeader('Authorization', "Bearer "+JSON.parse(localStorage.getItem('accessToken')))
        xmlHttp.send(null)

        if (xmlHttp.status===200) {
            let json = JSON.parse(xmlHttp.responseText)
            setFavPokemon(json)
        } else {
            window.location.href = '/login'
        }
    }

    useEffect(()=>{
        getFavoritePokemones()
    }, [])

    const getCard = () => {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", 'https://pokeapi.co/api/v2/pokemon/' + pkmn.name, false)
        xmlHttp.send(null)

        let pokemon = JSON.parse(xmlHttp.responseText)

        let pokemonTypes = pokemon.types
        let pokemonTypesStr = pokemonTypes.map((type) => {
            return (<Grid item><Chip size={'small'} color={'primary'} label={type.type.name}/></Grid>)
        })

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
                setFavPokemon([...favPokemon, pokemonID])
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
                setFavPokemon(favPokemon.map((id) => {
                    if (id!==pokemonID) {
                        return id
                    }
                }))
            }
        }

        const cardButton = (pokemonID) => {
            if (! favPokemon.includes(pokemonID)) {
                return (
                    <Button size="medium" onClick={() => {
                        setFavorite(pokemonID)
                    }} color="primary">
                        Favorite
                    </Button>
                )
            } else {
                return (
                    <Button size="medium" onClick={() => {
                        setUnfavored(pokemonID)
                    }} color="primary">
                        Unfavored
                    </Button>
                )
            }
        }

        if (cardIsHover) {
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

            return (
                <Card className={materialClassesCard.root}>
                    <CardActionArea onClick={()=>{setCardIsHover(!cardIsHover)}}>
                        <Radar data={chartData} type="undefined" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {pokemon.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Grid container
                                      justify="flex-start"
                                      alignItems="baseline"
                                      spacing={1}>
                                    Type: {pokemonTypesStr}
                                </Grid>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )
        } else {
            return (
                <Card className={materialClassesCard.root}>
                    <CardActionArea onClick={()=>{setCardIsHover(!cardIsHover)}}>
                            <CardMedia
                                className={materialClassesCard.media}
                                image={"https://pokeres.bastionbot.org/images/pokemon/" + pokemon.id + ".png"}
                                title={pokemon.name}
                            />
                        <CardContent onClick={()=>{setCardIsHover(!cardIsHover)}}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {pkmn.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Grid container
                                      justify="flex-start"
                                      alignItems="baseline"
                                      spacing={1}>
                                    Type: {pokemonTypesStr}
                                </Grid>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        {cardButton(pokemon.id)}
                    </CardActions>
                </Card>
            )
        }
    }

    return(
        <Grid item>
            {getCard()}
        </Grid>
    );
}

export default Pokemone