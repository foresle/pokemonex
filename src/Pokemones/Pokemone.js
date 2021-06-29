import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        width: 300
    },
    media: {
        height: 300,
    },
});

function Pokemone({pkmn}) {
    const classes = useStyles();

    return(
        <Grid item>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={"https://pokeres.bastionbot.org/images/pokemon/" + pkmn.url.slice(34).slice(0,-1) + ".png"}
                        title={pkmn.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {pkmn.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Type:
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Pokemone