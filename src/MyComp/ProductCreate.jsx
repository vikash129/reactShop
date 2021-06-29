import React, {  useState } from 'react'
import { Button, CssBaseline, TextField, Checkbox, Container, makeStyles, Input, FormControlLabel } from '@material-ui/core';

import { CreateNewFolderRounded, Create, AddAPhoto, CheckBox, Save } from '@material-ui/icons';

import axios from 'axios'



const useStyles = makeStyles((theme) => ({
    paper: {
        margintop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
})

)

export const ProductCreate = () => {


    const [name, setName] = useState(' ')
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState(' ')
    const [type, setType] = useState(' ')
    // const [date, setDate] = useState('')
    const [image, setImage] = useState([])

    const [checked, setChecked] = useState(false)


    function formdata() {
        const formData = new FormData()

        formData.append('myImage', image)
        formData.append('product', name)
        formData.append('price', price)
        formData.append('type', type)
        formData.append('description', desc)

        return formData
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const headers = { "Content-Type": 'application/json', 'Access-Control-Allow-Origin': '*' }

        axios.post('http://localhost:4000/product/add', formdata(), headers)
            .then((response) => {
                alert('product created')
                setName('')
                setDesc('')
                setPrice(0)
                setType('')
                setImage([])
                setChecked(false)
            })
            .catch(e => { alert('network dikkat') })

       

    }



    const classes = useStyles()


    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>



                <form className='w-100 mt-4' onSubmit={handleSubmit}>

                    <TextField
                        variant='filled'
                        margin='normal'
                        id='name'
                        label='Product Name'
                        autoFocus fullWidth
                        onChange={(e) => { setName(e.target.value) }}
                    />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Product Description'
                        autoFocus fullWidth
                        onChange={(e) => { setDesc(e.target.value) }} />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        label='Product Type'
                        autoFocus fullWidth
                        onChange={(e) => { setType(e.target.value) }} />

                    <TextField
                        variant='outlined'
                        margin='normal'
                        type='number'
                        label='Product Price'
                        autoFocus fullWidth
                        onChange={(e) => { setPrice(e.target.value) }} />

                    {/* <TextField
                        variant='filled'
                        margin='normal'
                        color = 'primary'
                        type='date'
                        // value = {new Date().getFullYear()}
                        autoFocus fullWidth
                        onChange={(e) => { setDate(e.target.value) }} /> */}

                    {/* <AddAPhoto /> */}
                    <FormControlLabel
                        label='Submit your prod image'

                        control={
                            <Input
                                icon={<AddAPhoto />}

                                type='file'
                                className='mx-1'
                                autoFocus required fullWidth
                                onChange={(e) => { setImage(e.target.files[0]) }}
                            />
                        }



                    />


                    <FormControlLabel

                        control={
                            <Checkbox
                                icon={<CheckBox />}
                                checkedIcon={<Save />}
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                inputProps={{
                                    'aria-label': 'secondary checkbox'
                                }}

                            />
                        }
                        label='Sure to create the product ?'
                    />


                    <Button
                        type='submit'
                        startIcon={CreateNewFolderRounded}
                        startIcon={<Create />}
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}>
                        Create
                    </Button>


                </form>


            </div>



        </Container>
    )
}




