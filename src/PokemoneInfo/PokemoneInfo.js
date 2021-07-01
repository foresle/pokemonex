import React from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {Radar} from "react-chartjs-2";

const useStyles = makeStyles({
    root: {
        maxWidth: 400
    },
});

function PokemonesInfo() {
    const classes = useStyles()
    let {pokemonName} = useParams()

    const getPokemon = () => {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", 'https://pokeapi.co/api/v2/pokemon/' + pokemonName, false)
        xmlHttp.send(null)

        let pkmn = JSON.parse(xmlHttp.responseText)

        const chartData = {
            labels: [
                pkmn.stats[0].stat.name,
                pkmn.stats[1].stat.name,
                pkmn.stats[2].stat.name,
                pkmn.stats[3].stat.name,
                pkmn.stats[4].stat.name,
                pkmn.stats[5].stat.name
            ],
            datasets: [{
                label: pkmn.name,
                data: [pkmn.stats[0].base_stat,
                    pkmn.stats[1].base_stat,
                    pkmn.stats[2].base_stat,
                    pkmn.stats[3].base_stat,
                    pkmn.stats[4].base_stat,
                    pkmn.stats[5].base_stat],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        }

        return(
            <Grid container
                  direction='row'
                  justify='center'>
                <Grid item><Box p={4} maxWidth='400px'><Paper><Box p={3}><img alt={pkmn.name} width='100%' src={"https://pokeres.bastionbot.org/images/pokemon/" + pkmn.id + ".png"}/></Box></Paper></Box></Grid>
                <Grid item>
                    <Box p={4} maxWidth='400px'>
                        <Paper>
                            <Box p={3}>
                                <Typography align="center" variant="h4">
                                    {pkmn.name}
                                </Typography>
                                <br/>
                                <Typography variant="h5" color="textSecondary" component="p">
                                    Type: {pkmn.types.map((type)=>{return(type.type.name + ' ')})}
                                    <br/>
                                    Height: {pkmn.height}
                                    <br/>
                                    Weight: {pkmn.weight}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item>
                    <Box p={4} maxWidth='400px'>
                        <Paper>
                            <Box p={0}>
                                <Radar data={chartData} type="undefined"/>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        )
    }

    return(
        <>
            {getPokemon()}
        </>
    )
}

export default PokemonesInfo