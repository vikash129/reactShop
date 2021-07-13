import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Container, Typography, CssBaseline, Grid, Card, CardMedia , CardActions , CardContent , Link } from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(30deg , blue , green)',
        border: 20,
        marginTop: 15,
        borderRadius: 15,
        color: 'white',
        padding: '5px 38px'
    }
})

function CopyRight() {
    return (
        <Typography variant = 'body2' color = 'textSecondary' align = 'center'>
            {'CopyRight  @'}
            <Link color = 'inherit' href = '/' >
                React-EshopWorld.Com
            </Link>{' '}
            {new Date.getFullYear()}
            {'.'}
        </Typography>
    )
}


export const ProductView = (props) => {

    const classes = useStyles()

    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(1)
    // const price = 1000
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        axios.get('https://react-shopworld.herokuapp.com/product/' + props.id).then((res) => setProduct(res.data))
        setTotalPrice(product.price * qty)
    }, [qty])


    return (
        <>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>

                    <Container maxWidth='sm'>

                        <Typography component='h1' variant='h3' color='textPrimary' align='center' gutterBottom>
                            Explore more about the product
                        </Typography>

                        <Typography variant='h5' color='textSecondary' align='center' paragraph>
                            /buy the product
                        </Typography>

                    </Container>
                </div>

                <Container className={cardGrid} maxWidth='md'>

                    <Grid container spacing={4}>

                        <Grid item xs={12} sm={6} md={4}>

                            <Card className={classes.card}>

                                <CardMedia
                                    className={classes.CardMedia}
                                    image={'/uploads/images/' + product.image}
                                    title='product' />

                                <CardContent className={classes.CardContent}>

                                    <Typography gutterBottom variant='body1' component='h2'>
                                        {product.product}
                                    </Typography>

                                    <Typography >
                                        {product.price}
                                    </Typography>

                                    <Typography variant='subtitle1'>
                                        {product.description}
                                    </Typography>

                                    <Typography >
                                        {product.type}
                                    </Typography>

                                </CardContent>

                                <CardActions>

                                    qty : {qty} <Button size='small' color='primary' onClick={e => setQty(() => { return qty + 1 })} >
                                        +
                                    </Button>

                                    <h4>TotalPrice : {totalPrice} </h4>
                                    <Button component={Link} variant='contained' to={'/checkOut/' + totalPrice}>Purchase</Button>

                                </CardActions>

                            </Card>

                        </Grid>


                    </Grid>


                </Container>
                </main>

                <footer className = {classes.footer}>
<Typography variant = 'h6' align = 'center' gutterBottom>
    purchases 
</Typography>

<Typography variant = 'subtitle1' align = 'center' color = 'textSecondary' component = 'p'>
    Thanks 
</Typography>

    <CopyRight/>

                </footer>

                </>

                )
}