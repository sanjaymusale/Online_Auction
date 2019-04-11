import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({
    container: {
        marginTop: '5%'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9

        height: '600px',

        width: "600px"

    },
    card: {
        
        flexDirection: 'column'
    },
});

function PaperSheet(props) {
    const { classes } = props;

    return (

        <div className={classes.container}>
            <div className="container">
                <div className="row">

                    <div className="col-md-8 col-sm-8 col-lg-8" >
                        <Paper className={classes.root} elevation={15}>

                            <div className="row">
                                <div className="col-sm-4">
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image='http://localhost:3001/public/uploads/image-1554979456683.jpg' // eslint-disable-line max-len
                                                title='Click to View'

                                            />
                                        </CardActionArea>
                                    </Card>
                                </div>
                                <div className="col-sm-8">col-sm-4</div>

                            </div>

                        </Paper>
                        <br />
                    </div>


                </div>
            </div>
        </div>


    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);