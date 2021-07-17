import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Container, Typography, CssBaseline, Grid, Card, CardMedia , CardActions , CardContent , Link } from '@material-ui/core'
import axios from 'axios'
import {Link as RouterLink} from 'react-router-dom'

const useStyles = makeStyles((theme) =>({
    
    heroContent:{
        backgroundColor : theme.palette.background.paper , 
        padding : theme.spacing(2 , 0 , 1)
    },
    heroButtons : {
        marginTop : theme.spacing(4)
    },
    cardGrid : {
        background: 'linear-gradient(30deg , blue , green)',
        border: 20,
        paddingTop : theme.spacing(4),
        paddingBottom : theme.spacing(4)
    },
    card: {
        height : '100%',
        display : 'flex',
    },
    CardMedia : {
        height : '25%',
        width : '30%' , 
        margin : theme.spacing(3 , 2, 1),        
        paddingTop : '30.25%'
    },
    CardContent : {
        flexGrow : 1
    } , 
    CheckOutActions : {
        display : 'flex' ,
        flexDirection :'column',
alignItems : 'start',
        justifyContent : 'space-around' ,
        margin : theme.spacing(3 , 2, 1),
        padding : theme.spacing(3 , 2, 1),
        
    },

    footer : {
        backgroundColor : theme.palette.background.paper , 
        padding : theme.spacing(3)
    }
})
)

function CopyRight() {
    return (
        <Typography variant = 'body2' color = 'textSecondary' align = 'center'>
            {'CopyRight  @'}
            <Link color = 'inherit' href = '/' >
                React-EshopWorld.Com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}


export const ProductView = (props) => {

    const classes = useStyles()

    const [product, setProduct] = useState({})
    const [qty, setQty] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        axios.get('https://react-shopworld.herokuapp.com/product/' + props.id).then((res) => setProduct(res.data))
        product.price ?  setTotalPrice(product.price * qty) : setTotalPrice(100 * qty)
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
                            buy the product
                        </Typography>

                    </Container>
                </div>

                <Container className={classes.cardGrid} maxWidth='md'>


                            <Card  className={classes.card} xs={12} sm={6} md={4} spacing={6}>

                                <CardMedia
                                    className={classes.CardMedia}
                                    image={'/uploads/images/' +( product?.image ? product.image : 'spider.jpg') }
                                    title= {product.product} />
                             
                             <hr/>
                                <CardContent className={classes.CardContent}>

                                    <Typography gutterBottom variant='body1' component='h2'>
                                      Product  : {product.product}
                                    </Typography><hr/>

                                    <Typography >
                                       Price :  {product.price} Rs<hr/>
                                    </Typography>

                                    <Typography variant='subtitle1'>
                                        {product.description}<hr/>
                                    </Typography>

                                    <Typography >
                                        {product.type}<hr/>
                                    </Typography>

                                </CardContent>
                                <hr/>


                                <CardActions className = {classes.CheckOutActions}>

                                   <div > 
                                       qty : <Button  color='primary' variant = 'contained' onClick={e => setQty(() => { return qty + 1 })} >
                                        +
                                    </Button>
                                     {qty} 
                                     <Button  color='secondary'  variant = 'contained' onClick={e => setQty(() => { return  qty > 1  ? qty - 1 : 1 })} >
                                        -
                                    </Button>
                                     </div>

                                    <h4>TotalPrice : {totalPrice} </h4>
                                    <Button component={RouterLink} variant='contained' to={'/checkOut/' + totalPrice}>Purchase</Button>

                                </CardActions>

                                </Card>







                </Container>
                </main>


                <footer className = {classes.footer}>


<Typography variant = 'subtitle1' align = 'center' color = 'textSecondary' component = 'p' gutterBottom>
    Thanks 
</Typography>

    <CopyRight/>

                </footer>

                </>

                )
}