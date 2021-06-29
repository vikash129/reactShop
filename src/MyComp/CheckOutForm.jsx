import React, { useEffect, useState } from 'react'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import axios from 'axios'

import { Card, CardContent, Button, CssBaseline } from '@material-ui/core';

const stripePromise = loadStripe(
    'pk_test_51J5EHJSEzMLO0wLKuoQkQvHZDW5XE5xwQiSXP61XSBMfzmHNvLDnf9iU0Ba68wuh6nAldPxtld3ORd1P07BDzDsq00ndvDCXLX'
)

const Form = (props ) => {

    const stripe = useStripe()
    const elements = useElements()

    const amount = props.match.params.totalPrice

    const [isProcessing, setIsProcessing] = useState(false)
    const [checkOutError, setCheckOutError] = useState('')


    //styling
    const CardElementOpts = {

        style: {
            base: {
                iconColor : '#c4f0ff',
                color: 'green',
                fontWeight : 500 , 
                fontFamily : 'Roboto , Open Sans',
                fontSize: '16px',
                '::placeholder' : {
                    color : 'orange'
                },
                fontSmoothing : 'antialised', 
                ':-webkit-autofill' : {
                    color : '#f3ggg'
                }

            },
            invalid: {
                iconColor: 'blue',
                color: 'red'
            },
            complete: {
                color: 'green'
            }
        },
        iconStyle: 'solid',

        hidePostalCode: false
    }


    //handle change
    const handleChange = (e) => {
        e.error && setCheckOutError(e.error.message)
    }

    //handle submission
    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsProcessing(true)

        const billingDetails = {
            // name: 'vikash',
            // email: 'vikashvermacom92@gmail.com'
            name: props.loginUser.username,
            email:props.loginUser.email
        }


        const cardElement = elements?.getElement(CardElement)


        try {
            //post request
            const { data: clientSecret } = await axios.post('http://localhost:4000/payment', {
                amount
            })
            // pi_1J6zmRSEzMLO0wLKK6nk2Z1r_secret_B78GDCYa04NwUG7YdDwFLLq3d

            //handle payment method
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: billingDetails
            });

            if (paymentMethodReq.error) {
                setCheckOutError(paymentMethodReq.error.message)
                setIsProcessing(false)
                return
            }

            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            })

            if (error) {
                elements.getElement('card').focus()
                setCheckOutError(error.message)
                setIsProcessing(false)

                return
            }

            alert('misson succccsxxxfull')

        }

        catch (e) {
            console.log('catch ', e)
            setCheckOutError(e.message)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CssBaseline />
            <h1>check out 0age</h1>
            <Card>

                <CardContent>
                    <CardElement
                        options={CardElementOpts}
                        onChange={handleChange} />
                </CardContent>

                <CardContent>
                    {checkOutError && alert(checkOutError)}
                </CardContent>

                <Button
                    disabled={isProcessing || !stripe}
                    variant='contained'
                    color='primary'
                    type='submit'
                >
                    {isProcessing ? 'Processing.....' : `Pay : Rs.${amount}`}

                </Button>

            </Card>

        </form>
    )

}






export const CheckOutForm = (props) => {
console.log(props)
    return (
        <Elements stripe={stripePromise}>
            <Form {...props}  />
        </Elements>
    )
}
