const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const userModel = require('../modals/user.model')

router.route('/').get((req, res) => {

    userModel.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json(err))
})

//fing by id
router.route('/:username').delete((req, res) => {

    const username = req.params.username

    userModel.findByIdAndDelete(username)
        .then(() => res.json({ deletedData: username}))
        .catch(err => res.status(400).json({ deleError: err }))
})




router.route('/login').post(async (req, res) => {


    const username = req.body.username
    const password = req.body.password
    const remember = req.body.remember

    const user = await userModel.findOne({ username })

    if (user) {
        if (user?.password === password) {
            user.Rememberlogin = remember

            user.save()
                .then((result) => res.status(200).send(result))
        }
        else {
            return res.send({ err: 'password is wrong' })
        }
    }
    else {
        return res.send({ err: 'username is wrong' })
    }

}
)




router.route('/signIn').post((req, res) => {

    // const _id = Math.floor(Math.random() * 1000)
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const Rememberlogin = req.body.remember
    const login_token = uuidv4()
    const date = new Date().getTime()


    const newUser = new userModel({
        username,
        password,
        email,
        Rememberlogin,
        login_token,
        date
    })

    newUser.save()
        .then((result) => res.status(200).send(result))
        .catch(err => { res.send({ err: 'username exist.. try with different username ' }); console.log(err.message) })
})


module.exports = router