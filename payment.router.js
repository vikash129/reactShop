const router = require('express').Router()
// const paymentModel = require('../modals/payment.model')

const { v4: uuidv4 } = require('uuid');
const api = require('./.env')
const stripe = require('stripe')(api.Secret_key)


router.route('/').post(async (req, res) => {

    const amount = req.body.amount
    // const product = req.body.product
    // const user = req.body.user


    // const { name, email, address, phone } = user
    // const { productName, price, qty, totalPrice } = product


try{
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'INR',
    })
    res.status(200).send( paymentIntent.client_secret )
}
catch(error){
    res.status(500).send( {statusCode  : 500 , message : error.message} )
    console.log(error)

}


})

module.exports = router










































// stripe.customers.create({
// })
// {
//     "id": "cus_JiwMWyyYpC7CUx",
//     "object": "customer",
//     "address": null,
//     "balance": 0,
//     "created": 1624448545,
//     "currency": null,
//     "default_source": null,
//     "delinquent": false,
//     "description": null,
//     "discount": null,
//     "email": "vikashvermacom92@gmail.com",
//     "invoice_prefix": "44606D6B",
//     "invoice_settings": {
//       "custom_fields": null,
//       "default_payment_method": null,
//       "footer": null
//     },
//     "livemode": false,
//     "metadata": {},
//     "name": "vikash",
//     "next_invoice_sequence": 1,
//     "phone": "8817956935",
//     "preferred_locales": [],
//     "shipping": null,
//     "tax_exempt": "none"
//   }




// Note: Node.js API does not throw exceptions, and instead prefers the
// asynchronous style of error handling described below.
//
// An error from the Stripe API or an otheriwse asynchronous error
// will be available as the first argument of any Stripe method's callback:
// E.g. stripe.customers.create({...}, function(err, result) {});
//
// Or in the form of a rejected promise.
// E.g. stripe.customers.create({...}).then(
//        function(result) {},
//        function(err) {}
//      );

// switch (err.type) {
//     case 'StripeCardError':
//       // A declined card error
//       err.message; // => e.g. "Your card's expiration year is invalid."
//       break;
//     case 'StripeRateLimitError':
//       // Too many requests made to the API too quickly
//       break;
//     case 'StripeInvalidRequestError':
//       // Invalid parameters were supplied to Stripe's API
//       break;
//     case 'StripeAPIError':
//       // An error occurred internally with Stripe's API
//       break;
//     case 'StripeConnectionError':
//       // Some kind of error occurred during the HTTPS communication
//       break;
//     case 'StripeAuthenticationError':
//       // You probably used an incorrect API key
//       break;
//     default:
//       // Handle any other types of unexpected errors
//       break;
//   }