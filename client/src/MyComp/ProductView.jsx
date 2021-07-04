import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Container, Typography , CssBaseline  , } from '@material-ui/core'
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
        <Container className={classes.root}  >

            <Typography variant='h3'>
                Explore more about the product
            <CssBaseline />
            </Typography>

            <Typography variant='body1' component = 'div'>
                {product.product}
            </Typography>


            <Typography variant='h6'>
                {product.price}
            </Typography>

            <Typography variant='subtitle1'>
            {product.description}
            </Typography>

            <Typography variant='h4'>
            {product.type}
            </Typography>

            {/* <img src={'/uploads/images/' + product.image} alt='' /> */}

            {/* <h3>Hazmola</h3> */}
            <h5>qty <Button onClick={e => setQty(() => { return qty + 1 })} variant='contained'>{qty}</Button></h5>

            <h4>TotalPrice : {totalPrice} </h4>
            {/* <img src={'/uploads/images/' + 'spider.jpg'} alt='' /> */}

            <Button component={Link} variant='contained' to={'/checkOut/' + totalPrice}>Purchase</Button>



        </Container>

    )
}