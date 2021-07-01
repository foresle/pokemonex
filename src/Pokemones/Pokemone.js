import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Chip, Grid, makeStyles, Typography} from "@material-ui/core";
import {Router, Link} from "react-router-dom";

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

    const getTypes = (pkmnName) => {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET", 'https://pokeapi.co/api/v2/pokemon/' + pkmnName, false)
        xmlHttp.send(null)

        let pkmnTypes = JSON.parse(xmlHttp.responseText).types
        let typesStr = ''
        typesStr = pkmnTypes.map((type, typeIndx) => {
            return (<Grid item><Chip size={'small'} color={'primary'} label={type.type.name}/></Grid>)
        })

        return (
            typesStr
        )
    }

    return(
        <Grid item>
            <Link to={'/pokemon/'+pkmn.name} style={{textDecoration: "none"}}>
                <Card className={materialClassesCard.root}>
                    <CardActionArea>
                        <CardMedia
                            className={materialClassesCard.media}
                            image={"https://pokeres.bastionbot.org/images/pokemon/" + pkmn.url.slice(34).slice(0,-1) + ".png"}
                            title={pkmn.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {pkmn.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <Grid container
                                      justify="flex-start"
                                      alignItems="baseline"
                                      spacing={1}>
                                    Type: {getTypes(pkmn.name)}
                                </Grid>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    );
}

export default Pokemone