import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles, Card, CardActions, CardContent, Button, Typography, CssBaseline, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 3,
    },
    paper: {
        justifyContent: 'space-around'
    },
    card: {
        padding: theme.spacing(1),
        width: 270,
        margin: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 10
    },
    image: {
        width: 150,
        height: 150
    },

})
)


export const Shop = ({ logginUser  , handleCart}) => {

    const classes = useStyles()

    const [products, setProducts] = useState([
        { _id: "60c", product: "hazmola", description: "pachan", price: 20, date: "1970-01-01", image: 'spider.jpg', type: 'food' },
        { _id: "60c6", product: "hp laptop", description: "fasttter", price: 2000000, date: "1970-01-01", image: 'spider.jpg', type: 'electronic' }
    ])


    useEffect(() => {
        axios.get('http://localhost:4000/product')
            .then((result) => setProducts(result.data))
    }, [])


  
    return (
        <div className={classes.root}>
            <h1 className='text-center'>Ecomm Products</h1>

            <Grid container spacing={3} className={classes.paper}>

                <CssBaseline />

                {products.map((pro, ind) => {
                    return (

                        <Card xs={3} sm={1} variant='outlined' key={ind} className={classes.card}>

                            <CardContent >

                                <Typography variant="body2" >
                                    {pro.date}
                                </Typography>

                                <Typography variant="body2" >
                                    <img src={`/uploads/images/${pro.image}`} className={classes.image} alt={pro.image} />
                                </Typography>

                                <Typography className={classes.title}>
                                    {pro._id} -- {pro.product}
                                </Typography>


                                <Typography color='textSecondary' className={classes.pos}>
                                    {pro.description}
                                </Typography>

                                <Typography variant='h5' component='h2'>
                                    {pro.price}/Rs Only.
                                </Typography>



                                <CardActions>

                                    <Button
                                        size='small'
                                        variant='contained'
                                        disabled={!logginUser && true}
                                        component={Link}
                                        to={'/view/' + pro._id}
                                    >
                                        View

                                    </Button>

                                    <Button
                                        size='small'
                                        variant='contained'
                                        color='primary'
                                        onClick={(e) => { handleCart(e, pro) }}
                                        disabled={!logginUser && true}
                                    >
                                        Add to FavList
                                    </Button>

                                </CardActions>

                            </CardContent>



                        </Card>

                    )
                })}

            </Grid>

        </div>
    )
}
