import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography} from "@material-ui/core";

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
        xmlHttp.open( "GET", 'https://pokeapi.co/api/v2/pokemon/' + pkmnName, false )
        xmlHttp.send( null )

        let pkmnTypes = JSON.parse(xmlHttp.responseText).types
        let typesStr = ''
        pkmnTypes.map((type, typeIndx)=>{
            typesStr = typesStr + type.type.name + ' '
        })

        return typesStr
    }

    return(
        <Grid item>
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
                            Type: {getTypes(pkmn.name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default Pokemone